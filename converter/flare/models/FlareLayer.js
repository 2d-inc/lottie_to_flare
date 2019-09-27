import FlareTransform from './properties/FlareTransform'
import FlareNode from './nodes/FlareNode'
import {addChildrenToLastLeaves} from '../helpers/lastLeavesHelper.js';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayer
{

	constructor(lottieLayer, animations, offsetTime, isHidden)
	{
		this._LottieLayer = lottieLayer
		this._Animations = animations
		this._OffsetTime = offsetTime
		this._Transforms = new FlareTransform(lottieLayer.transform, lottieLayer.name)
		this._Children = []
		this._Visibility = isHidden ? visibilityModes.HIDDEN_FULL : lottieLayer.isTrackMask ? visibilityModes.HIDDEN_LOCAL : visibilityModes.VISIBLE
		this._ContentId = null
		this._PreviousChild = null
	}

	createContent() {

		return []

	}

	convert() {


		let children = this._Children.map(child => {return child.convert()})

		const content = this.createContent()

		children = content.concat(children)

		const transform = this._Transforms.convert(this._Animations, this.offsetTime)

		if (transform) {
			addChildrenToLastLeaves(transform, children)
			children = transform
		}


		///
		const maskedChild = children.length ? children[0] : children;
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

		return children
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

	get contentId() {
		return this._ContentId
	}

	get visibility() {
		return this._Visibility
	}

	set previous(child) {
		this._PreviousChild = child
	}
}