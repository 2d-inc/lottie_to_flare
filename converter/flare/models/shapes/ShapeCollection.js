import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import FlareTransform from '../../models/properties/FlareTransform';
import FlareNode from '../../models/nodes/FlareNode';
import FlareOuterTransform from '../../models/FlareOuterTransform';
import FlareAnchorTransform from '../../models/FlareAnchorTransform';
import FlareOpacity from '../../models/FlareOpacity';
import convertProperty from '../../helpers/propertyConverter';

import FlareShapeFill from './FlareShapeFill';
import FlareShapeGradientFill from './FlareShapeGradientFill';
import FlareShapeGradientStroke from './FlareShapeGradientStroke';
import FlareShapeStroke from './FlareShapeStroke';
import FlareShapeEllipse from './FlareShapeEllipse';
import FlareShapeRectangle from './FlareShapeRectangle';
import FlareShapePath from './FlareShapePath';
import FlareShapeNode from './FlareShapeNode';
import ShapePaints from './ShapePaints';
import ShapePaths from './ShapePaths';

const paintTypes = {
	fill: FlareShapeFill,
	gradient_fill: FlareShapeGradientFill,
	gradient_stroke: FlareShapeGradientStroke,
	stroke: FlareShapeStroke,
}

const pathTypes = {
	[shapeTypes.PATH]: FlareShapePath,
	[shapeTypes.RECTANGLE]: FlareShapeRectangle,
	[shapeTypes.ELLIPSE]: FlareShapeEllipse,
}

export default class ShapeCollection extends FlareNode {

	constructor(paintData, transforms = [], modifiers = []) {
		super('Shape', [], 'shape')
		const PaintType = paintTypes[paintData.type];
		const paint = new PaintType(paintData);
		this._DrawOrder = paintData.drawOrder
		this._Transforms = [...transforms]
		this._Nodes = []
		this._IsClosed = false
		this._Modifiers = modifiers
		this._Paths = new ShapePaths()
		this._Paints = new ShapePaints(paint, this.id, this._Modifiers)
		// this.wrapLayer()
	}

	wrapLayer() {
		this._OuterNode = this._LayerContent
		this._OpacityNode = new FlareOpacity(this._LayerContent)
		this._AnchorNode = new FlareAnchorTransform(this._LayerContent)
		this._OuterTransformNode = new FlareOuterTransform(this._LayerContent)

		if (this._OpacityNode.hasOpacity()) {
			this._OpacityNode.addChild(this._OuterNode)
			this._OuterNode = this._OpacityNode
		}
		if (this._AnchorNode.hasTransformationApplied()) {
			this._AnchorNode.addChild(this._OuterNode)
			this._OuterNode = this._AnchorNode 
		}
		if (this._OuterTransformNode.hasTransformationApplied()) {
			this._OuterTransformNode.addChild(this._OuterNode)
			this._OuterNode = this._OuterTransformNode
		}
	}

	addPaint(paintData) {
		const PaintType = paintTypes[paintData.type];
		const paint = new PaintType(paintData);
		this._Paints.addPaint(paint);
	}

	getAdditionalTransforms(pathTransform) {
		return pathTransform.slice(this._Transforms.length)
	}

	addPathToNode(path, transforms) {
		let node = this._Nodes.find(node => {
			const unmatchedTranform = node.transforms.find((transform, index) => {
				if (transform !== transforms[index]) {
					return true
				}
			})
			if(!unmatchedTranform && transforms.length === node.transforms.length) {
				return node
			}
		})
		if (!node) {
			node = new FlareShapeNode(transforms)
			this._Paths.addPath(node)
			this._Nodes.push(node)
		}
		node.addPath(path)
	}

	addPath(path, transforms) {
		if (!this._IsClosed) {
			const PathType = pathTypes[path.type]
			const additionalTransforms = this.getAdditionalTransforms(transforms)
			const pathInstance = new PathType(path);
			if (additionalTransforms.length) {
				this.addPathToNode(pathInstance, additionalTransforms)
			} else {
				this._Paths.addPath(pathInstance);
			}
		}
	}

	close() {
		this._IsClosed = true
	}

	convertTextures() {

		return this._Paints
	}

	exportTrim(animations, nodeId, offsetTime) {

		const trimModifier = this._Modifiers.find(modifier => modifier.type === shapeTypes.TRIM_PATH)

		let trimData

		if (trimModifier) {

			const trimStart = convertProperty(trimModifier.start, 'trimStart', animations, nodeId, 0.01, offsetTime)
			const trimEnd = convertProperty(trimModifier.end, 'trimEnd', animations, nodeId, 0.01, offsetTime)
			const trimOffset = convertProperty(trimModifier.offset, 'trimOffset', animations, nodeId, 1 / 360, offsetTime)
			trimData = {
				trim: "sequential",
				trimStart,
				trimEnd,
				trimOffset,
			}
		} else {
			trimData = {
				trim: "off",
				trimStart: 0,
				trimEnd: 1,
				trimOffset: 0,
			}
		}

		return trimData
	}

	convert(animations, offsetTime, isHidden) {


		this.addChildren([this._Paints, this._Paths])

		const shape = {
			...super.convert(animations, offsetTime),
			blendMode: "srcOver",
			drawOrder: this._DrawOrder,
			transformAffectsStroke: true,
			hidden: isHidden,
		}

		let mainNode = shape

		const transforms = this._Transforms

		if (transforms.length) {
			let lastNode
			transforms.forEach(transform => {
				const flareTransform = new FlareTransform(transform)
				if (flareTransform.opacity) {
					const opacityNode = new FlareNode('Shape_Opacity')
					opacityNode.opacity = convertProperty(transform.opacity, 'opacity', animations, opacityNode.id, 0.01, offsetTime)
					const opacityNodeData = opacityNode.convert()
					if (!lastNode) {
						mainNode = opacityNodeData
					} else {
						addChildToLastLeaves(lastNode, opacityNodeData)
					}
					lastNode = opacityNodeData
				}
				const node = flareTransform.convert(animations, offsetTime)
				if (node) {
					if (!lastNode) {
						mainNode = node
					} else {
						addChildToLastLeaves(lastNode, node)
					}
					lastNode = node
				}
			})

			if (lastNode) {
				addChildToLastLeaves(lastNode, shape)
			}

		}

		return mainNode
	}

	__convertTextures(animations, id, offsetTime, trimModifierData, isHidden) {

		return this._Paints.map(paint => {
			return paint.convert(id, animations, offsetTime, trimModifierData, isHidden)
		})
		.filter(paint => !!paint)
	}
}