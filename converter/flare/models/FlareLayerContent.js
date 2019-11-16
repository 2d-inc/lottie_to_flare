import FlareTransform from './properties/FlareTransform'
import FlareNode from './nodes/FlareNode'
import {addChildToLastLeaves} from '../helpers/lastLeavesHelper.js';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayerContent extends FlareNode
{

	constructor(lottieLayer, animations, offsetTime, isHidden)
	{
		super(lottieLayer.name)
		this._LottieLayer = lottieLayer
		this._Animations = animations
		this._OffsetTime = offsetTime
		this.transforms = new FlareTransform(lottieLayer.transform, lottieLayer.name)
		this._Visibility = isHidden ? visibilityModes.HIDDEN_FULL : lottieLayer.isTrackMask ? visibilityModes.HIDDEN_LOCAL : visibilityModes.VISIBLE
		this._ContentId = null
		this._PreviousChild = null
	}

	createContent() {

		return []

	}

	convert(animations, offsetTime) {

		const layer = this.lottieLayer
		
		return {
			...super.convert(animations, offsetTime),
			blendMode: "srcOver",
			drawOrder: layer.drawOrder,
			hidden: this.visibility !== visibilityModes.VISIBLE,
		}
	}

	_convert() {

		let content = this.createContent()
		///
		const maskedChild = content;
		this._ContentId = maskedChild.id;


		let maskType = 'alpha'
		const lottieLayer = this.lottieLayer
		if (lottieLayer.trackMaskType) {
			const maskTypes = {
				1: 'alpha',
				2: 'inverted-alpha',
				3: 'luminance',
				4: 'inverted-luminance',
			}
			const maskerId = this._PreviousChild.contentId;
			maskedChild.masks = [maskerId];
			maskType = maskTypes[lottieLayer.trackMaskType];
		}

		maskedChild.maskType = maskType;
		////

		if (this._Children.length) {
			let children = this._Children.map(child => {return child.convert()})
			children = [content].concat(children)

			content = new FlareNode(name + '_Parenter', children).convert()

		}
		
		// const transform = this._Transforms.convert(this._Animations, this.offsetTime)

		// if (transform) {
		// 	addChildToLastLeaves(transform, content)
		// 	content = transform
		// }


		

		return content
	}

	addChild(child) {
		this._Children.push(child)
	}

	get lottieLayer() {
		return this._LottieLayer
	}

	get offsetTime() {
		return this._OffsetTime
	}

	get animations() {
		return this._Animations
	}

	get contentId() {
		return this._ContentId
	}

	get visibility() {
		return this._Visibility
	}

	get inPoint() {
		return this._LottieLayer.inPoint
	}

	get outPoint() {
		return this._LottieLayer.outPoint
	}

	get animations() {
		return this._Animations
	}

	set previous(child) {
		this._PreviousChild = child
	}
}