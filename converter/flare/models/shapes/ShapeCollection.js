import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {convertRectangleType, convertPathType, convertEllipseType} from '../../helpers/shape/pathConverters.js';
import {addChildrenToLastLeaves, addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import nodeId from '../../../helpers/nodeId';
import FlareTransform from '../../models/properties/FlareTransform';
import convertProperty from '../../helpers/propertyConverter';

import FlareShapeFill from './FlareShapeFill';
import FlareShapeStroke from './FlareShapeStroke';

const paintTypes = {
	fill: FlareShapeFill,
	stroke: FlareShapeStroke,
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
			this._Paths.push({
				path,
				transform: [...transforms]
			})
		}
	}

	close() {
		this._IsClosed = true
	}

	convertPath (pathData, animations, offsetTime) {

		const converters = {
			[shapeTypes.PATH]: convertPathType,
			[shapeTypes.RECTANGLE]: convertRectangleType,
			[shapeTypes.ELLIPSE]: convertEllipseType,
		}

		return converters[pathData.path.type](pathData.path, animations, offsetTime)
	}

	convertTextures(id, animations, offsetTime, trimModifierData) {
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

		const paths = this._Paths.map((pathData) => this.convertPath(pathData, animations, offsetTime))

		const id = nodeId()
		const trimModifierData = this.exportTrim(animations, id, offsetTime)
		const textures = this.convertTextures(id, animations, offsetTime, trimModifierData)

		const shape = {
			type: 'shape',
			id,
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: this._DrawOrder,
			children: [...textures, ...paths],
		}

		let mainNode = shape

		const transforms = this._Transforms

		if (transforms.length) {
			let lastNode
			transforms.forEach(transform => {
				const flareTransform = new FlareTransform(transform)
				const node = flareTransform.convert(animations)
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