import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {convertRectangleType, convertPathType, convertEllipseType} from './pathConverters.js';
import {convertFillType, convertStrokeType} from './textureConverters.js';
import {addChildrenToLastLeaves, addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import nodeId from '../../../helpers/nodeId';
import FlareTransform from '../../models/properties/FlareTransform';
import convertProperty from '../propertyConverter';

export default class ShapeCollection {

	constructor(shapeData, transforms = [], modifiers = []) {

		this._ShapeData = shapeData
		this._Transforms = [...transforms]
		this._Paths = []
		this._IsClosed = false
		this._Modifiers = modifiers
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

	convertTexture(textureData, animations, offsetTime, trimModifierData) {

		const converters = {
			fill: convertFillType,
			stroke: convertStrokeType,
		}

		return converters[textureData.type](textureData, animations, offsetTime, trimModifierData)
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
		const texture = this.convertTexture(this._ShapeData, animations, offsetTime, trimModifierData)

		const shape = {
			type: 'shape',
			id,
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: this._ShapeData.drawOrder,
			children: [texture, ...paths],
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