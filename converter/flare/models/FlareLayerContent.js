import FlareTransform from './properties/FlareTransform'
import FlareNode from './nodes/FlareNode'
import FlareDrawable from './nodes/FlareDrawable'
import {visibilityModes} from '../helpers/visibilityModes.js';

const nodeTypes = {
	0: 'node',
	1: 'node',
	2: 'image',
	3: 'node',
	4: 'node',
	5: 'node',
}

const maskTypes = {
	1: 'alpha',
	2: 'inverted-alpha',
	3: 'luminance',
	4: 'inverted-luminance',
}

export default class FlareLayerContent extends FlareDrawable {

	constructor(lottieLayer, isHidden, offsetTime)
	{
		const visibility = isHidden ? visibilityModes.HIDDEN_FULL : lottieLayer.isTrackMask ? visibilityModes.HIDDEN_LOCAL : visibilityModes.VISIBLE
		super(lottieLayer.drawOrder, visibility !== visibilityModes.VISIBLE, lottieLayer.name, nodeTypes[lottieLayer.type])
		this._LottieLayer = lottieLayer
		// TODO: check if this is necessary
		this._Visibility = isHidden ? visibilityModes.HIDDEN_FULL : lottieLayer.isTrackMask ? visibilityModes.HIDDEN_LOCAL : visibilityModes.VISIBLE
		this._ContentId = null
		this._PreviousChild = null
		this._OffsetTime = offsetTime
		this._Mask = null
		this._MaskType = maskTypes[lottieLayer.trackMaskType] || 'alpha'
	}

	createContent() {
		return []
	}

	convertMasks() {
		if(this._Mask) {
			return {
				masks: [this._Mask]
			}
		}
	}

	convert(animations, offsetTime) {

		return {
			...super.convert(animations, offsetTime),
			...this.convertMasks(),
			maskType: this._MaskType
		}
	}

	addChild(child) {
		this._Children.push(child)
	}

	addTrackMask(id) {
		this._Mask = id
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

}