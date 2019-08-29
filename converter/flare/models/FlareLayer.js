import FlareTransform from './properties/FlareTransform'
import node from '../node';
import {addChildrenToLastLeaves} from '../helpers/lastLeavesHelper.js';

export default class FlareLayer
{

	constructor(lottieLayer, animations)
	{
		this._LottieLayer = lottieLayer
		this._Animations = animations
		this._Transforms = new FlareTransform(lottieLayer.transform, lottieLayer.name)
		this._Children = []
	}

	createContent() {

		return []

	}

	convert() {

		let children = this._Children.map(child => {return child.convert()})

		const content = this.createContent()

		children = content.concat(children)

		const transform = this._Transforms.convert(this._Animations)

		if (!transform) {
			return children
		} else {
			addChildrenToLastLeaves(transform, children)
			return transform
		}
	}

	addChild(child) {
		this._Children.push(child)
	}

	get lottieLayer() {
		return this._LottieLayer
	}
}