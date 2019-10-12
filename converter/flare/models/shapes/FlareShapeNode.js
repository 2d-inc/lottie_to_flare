import FlareNode from '../nodes/FlareNode';
import FlareTransform from '../../models/properties/FlareTransform';
import {addChildToLastLeaves} from '../../helpers/lastLeavesHelper.js';

export default class FlareShapeNode {

	constructor(transforms) {
		this._Transforms = transforms
		this._Paths = []
	}

	createTransformTree(innerNode, animations, offsetTime) {

		let mainNode = innerNode

		const transforms = this._Transforms

		if (transforms.length) {
			let lastNode
			transforms.forEach(transform => {
				const flareTransform = new FlareTransform(transform)
				const node = flareTransform.convert(animations, offsetTime)
				if(!node) { return; }
				if (!lastNode) {
					mainNode = node
				} else {
					addChildToLastLeaves(lastNode, node)
				}
				lastNode = node
			})
			if(lastNode) {
				addChildToLastLeaves(lastNode, innerNode)
			}
		}
		return mainNode
	}

	addPath(path) {
		this._Paths.push(path)
	}

	convert(animations, offsetTime) {
		const children = this._Paths.map(path => path.convert(animations, offsetTime))
		let innerNode
		if (children.length === 1) {
			innerNode = children[0]
		} else {
			innerNode = new FlareNode('Group Path', children, 'node').convert()
		}
		return this.createTransformTree(innerNode, animations, offsetTime)
	}

	get transforms() {
		return this._Transforms;
	}
}