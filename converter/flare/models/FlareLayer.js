import transformNode from '../transformNode';
import {addChildrenToLastLeaves} from '../helpers/lastLeavesHelper.js';

export default class FlareLayer
{
	constructor(lottieLayer, converter)
	{
		this._LottieLayer = lottieLayer
		this._Transforms = transformNode(lottieLayer.transform)
		this._Content = converter(lottieLayer)
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