import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import FlareDrawable from '../../models/nodes/FlareDrawable';
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

export default class ShapeCollection {

	constructor(paintData, transforms = [], modifiers = []) {
		// TODO: fix second argument to set hidden value
		const drawable = new FlareDrawable(paintData.drawOrder, false)
		const PaintType = paintTypes[paintData.type];
		const paint = new PaintType(paintData);
		this._Transforms = [...transforms]
		this._Nodes = []
		this._IsClosed = false
		this._Modifiers = modifiers
		this._Paths = new ShapePaths()
		this._Paints = new ShapePaints(paint, drawable.id, this._Modifiers)
		drawable.addChildren([this._Paints, this._Paths])
		this._OuterNode = drawable
		this.wrapLayer()
	}

	wrapLayer() {
		for (let i = this._Transforms.length - 1; i >= 0 ; i -= 1) {
			const transform = this._Transforms [i]
			const opacityNode = new FlareOpacity(transform, 'Shape')
			const anchorNode = new FlareAnchorTransform(transform, 'Shape')
			const outerTransformNode = new FlareOuterTransform(transform, 'Shape')
			if (opacityNode.hasOpacity()) {
				opacityNode.addChild(this._OuterNode)
				this._OuterNode = opacityNode
			}
			if (anchorNode.hasTransformationApplied()) {
				anchorNode.addChild(this._OuterNode)
				this._OuterNode = anchorNode 
			}
			if (outerTransformNode.hasTransformationApplied()) {
				outerTransformNode.addChild(this._OuterNode)
				this._OuterNode = outerTransformNode
			}
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

	convert(animations, offsetTime) {
		return this._OuterNode.convert(animations, offsetTime)
	}

	get id() {
		return this._OuterNode.id
	}
}