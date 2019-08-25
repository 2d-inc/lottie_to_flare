import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import {convertRectangleType, convertPathType, convertEllipseType} from './pathConverters.js';
import {convertFillType, convertStrokeType} from './textureConverters.js';
import transformNode from '../../transformNode.js';
import {addChildrenToLastLeaves, addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';
import nodeId from '../../../helpers/nodeId';

export default class ShapeCollection {

	constructor(shapeData, transforms) {

		this._ShapeData = shapeData
		this._Transforms = [...transforms]
		this._Paths = []
		this._IsClosed = false
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

	convertPath (pathData) {
		const converters = {
			[shapeTypes.PATH]: convertPathType,
			[shapeTypes.RECTANGLE]: convertRectangleType,
			[shapeTypes.ELLIPSE]: convertEllipseType,
		}

		return converters[pathData.path.type](pathData.path)
	}

	convertTexture(textureData) {
		const converters = {
			fill: convertFillType,
			stroke: convertStrokeType,
		}

		return converters[textureData.type](textureData)
	}

	convert() {

		const paths = this._Paths.map(this.convertPath)

		const texture = this.convertTexture(this._ShapeData)

		const shape = {
			type: 'shape',
			id: nodeId(),
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: 1,
			children: [texture, ...paths]
		}

		let mainNode = shape

		const transforms = this._Transforms

		if (transforms.length) {
			let lastNode
			transforms.forEach(transform => {
				const node = transformNode(transform)
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