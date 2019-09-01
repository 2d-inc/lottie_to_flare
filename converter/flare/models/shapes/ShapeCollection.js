import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import FlareTransform from '../../models/properties/FlareTransform';
import FlareNode from '../../models/nodes/FlareNode';
import convertProperty from '../../helpers/propertyConverter';

import FlareShapeFill from './FlareShapeFill';
import FlareShapeStroke from './FlareShapeStroke';
import FlareShapeEllipse from './FlareShapeEllipse';
import FlareShapeRectangle from './FlareShapeRectangle';
import FlareShapePath from './FlareShapePath';

const paintTypes = {
	fill: FlareShapeFill,
	stroke: FlareShapeStroke,
}

const pathTypes = {
	[shapeTypes.PATH]: FlareShapePath,
	[shapeTypes.RECTANGLE]: FlareShapeRectangle,
	[shapeTypes.ELLIPSE]: FlareShapeEllipse,
}

export default class ShapeCollection {

	constructor(paintData, transforms = [], modifiers = []) {
		const PaintType = paintTypes[paintData.type];
		const paint = new PaintType(paintData);
		this._Paints = [paint];
		this._DrawOrder = paintData.drawOrder
		this._Transforms = [...transforms]
		this._Paths = []
		this._IsClosed = false
		this._Modifiers = modifiers
	}

	addPaint(paintData) {
		const PaintType = paintTypes[paintData.type];
		const paint = new PaintType(paintData);
		this._Paints.push(paint);
	}

	addPath(path, transforms) {
		if (!this._IsClosed) {
			const PathType = pathTypes[path.type]
			this._Paths.push(new PathType(path, [...transforms]));
		}
	}

	close() {
		this._IsClosed = true
	}

	convertTextures(animations, id, offsetTime, trimModifierData) {

		return this._Paints.map(paint => {
			return paint.convert(id, animations, offsetTime, trimModifierData)
		})
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

	convert(animations, offsetTime) {

		const paths = this._Paths.map((pathData) => pathData.convert(animations, offsetTime))

		let shapeNode = new FlareNode('Shape', [], 'shape')

		const trimModifierData = this.exportTrim(animations, shapeNode.id, offsetTime)
		const textures = this.convertTextures(animations, shapeNode.id, offsetTime, trimModifierData)

		shapeNode.addChildren([...textures, ...paths])

		const shape = {
			...shapeNode.convert(),
			blendMode: "srcOver",
			drawOrder: this._DrawOrder,
		}

		let mainNode = shape

		const transforms = this._Transforms

		if (transforms.length) {
			let lastNode
			transforms.forEach(transform => {
				const flareTransform = new FlareTransform(transform)
				const node = flareTransform.convert(animations, offsetTime)
				if (!lastNode) {
					mainNode = node
				} else {
					addChildToLastLeaves(lastNode, node)
				}
				lastNode = node
			})
			
			addChildToLastLeaves(lastNode, shape)
		}


		return mainNode
	}
}