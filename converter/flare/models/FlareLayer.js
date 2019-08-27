import transformNode from '../transformNode';
import node from '../node';
import {addChildrenToLastLeaves} from '../helpers/lastLeavesHelper.js';

export default class FlareLayer
{

	createContentTree(lottieLayer, converter) {

		let content = converter(lottieLayer)

		if (lottieLayer.transform && 'opacity' in lottieLayer.transform && lottieLayer.transform.opacity !== 1) {
			content = [node(content, {}, 'Node', lottieLayer.transform.opacity)]
		}

		return content

	}

	constructor(lottieLayer, converter)
	{
		this._LottieLayer = lottieLayer
		this._Transforms = transformNode(lottieLayer.transform)
		this._Content = this.createContentTree(lottieLayer, converter)
		this._Children = []
	}

	convert() {
		let children = this._Children.map(child => {return child.convert()})
		children = this._Content.concat(children)
		if (!this._Transforms) {
			return children
		} else {
			addChildrenToLastLeaves(this._Transforms, children)
			return this._Transforms
		}
	}

	addChild(child) {
		this._Children.push(child)
	}

	get lottieLayer() {
		return this._LottieLayer
	}
}