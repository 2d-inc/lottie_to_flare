import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {convertRectangleType, convertPathType, convertEllipseType} from './pathConverters.js';
import {convertFillType, convertStrokeType} from './textureConverters.js';
import {addChildrenToLastLeaves, addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import nodeId from '../../../helpers/nodeId';
import FlareTransform from '../../models/properties/FlareTransform';

export default class ShapeCollection {

	constructor(shapeData, transforms, animations) {

		this._ShapeData = shapeData
		this._Transforms = [...transforms]
		this._Paths = []
		this._IsClosed = false
		this._Animations = animations
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

	convertPath (pathData, animations) {

		const converters = {
			[shapeTypes.PATH]: convertPathType,
			[shapeTypes.RECTANGLE]: convertRectangleType,
			[shapeTypes.ELLIPSE]: convertEllipseType,
		}
		// console.log('pathData.path.type', pathData.path.type)

		return converters[pathData.path.type](pathData.path, animations)
	}

	convertTexture(textureData, animations) {
		const converters = {
			fill: convertFillType,
			stroke: convertStrokeType,
		}

		// console.log('textureData.type', textureData.type)

		return converters[textureData.type](textureData, animations)
	}

	convert(animations) {

		const paths = this._Paths.map((pathData) => this.convertPath(pathData, animations))

		const texture = this.convertTexture(this._ShapeData, animations)

		const shape = {
			type: 'shape',
			id: nodeId(),
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: this._ShapeData.drawOrder,
			children: [texture, ...paths]
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