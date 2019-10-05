import FlareNode from '../nodes/FlareNode'
import FlareTransform from '../../models/properties/FlareTransform';
import convertProperty from '../../helpers/propertyConverter';
import {addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';

export default class FlareShape {
	
	constructor(shapeData, transforms) {
		this._ShapeData = shapeData
		this._Transforms = transforms
	}

	createTransformTree(shape, animations, offsetTime) {

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

	convert() {
	}
}