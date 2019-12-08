import FlareContent from './FlareContent';
import FlareLayerNull from './FlareLayerNull';
import FlareLayerSolid from './FlareLayerSolid';
import FlareLayerImage from './FlareLayerImage';
import FlareLayerShape from './FlareLayerShape';
import FlarePrecompLayer from './FlarePrecompLayer';
import FlareOuterTransform from './FlareOuterTransform';
import FlareAnchorTransform from './FlareAnchorTransform';
import FlareOpacity from './FlareOpacity';
import FlareInOut from './FlareInOut';
import FlareClipNode from './FlareClipNode';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayer
{

	constructor(lottieLayer, isHidden, offsetTime)
	{
		this._LottieLayer = lottieLayer
		this._OffsetTime = offsetTime
		this._LayerContent = this.createContent(lottieLayer, isHidden)
	}

	createContent(layer, isHidden) {

		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, isHidden, this._OffsetTime);
			case 1:
			return new FlareLayerSolid(layer, isHidden, this._OffsetTime);
			case 2:
			return new FlareLayerImage(layer, isHidden, this._OffsetTime);
			case 3:
			return new FlareLayerNull(layer, isHidden, this._OffsetTime);
			case 4:
			return new FlareLayerShape(layer, isHidden, this._OffsetTime);
			default:
			return null
		}

	}

	wrapLayer(animations) {
		this._OuterNode = this._LayerContent
		this._ClipNode = new FlareClipNode(this._LayerContent)
		this._OpacityNode = new FlareOpacity(this._LottieLayer.transform, this._LayerContent.name)
		this._InOutNode = new FlareInOut(this, animations)
		this._AnchorNode = new FlareAnchorTransform(this._LottieLayer.transform, this._LayerContent.name)
		this._OuterTransformNode = new FlareOuterTransform(this._LottieLayer.transform, this._LayerContent.name)

		if (this._ClipNode.hasClips()) {
			this._ClipNode.addChild(this._OuterNode)
			this._OuterNode = this._ClipNode
		}
		if (this._OpacityNode.hasOpacity()) {
			this._OpacityNode.addChild(this._OuterNode)
			this._OuterNode = this._OpacityNode
		}
		if (this._InOutNode.hasInOutPoints()) {
			this._InOutNode.addChild(this._OuterNode)
			this._OuterNode = this._InOutNode
		}
		if (this._AnchorNode.hasTransformationApplied()) {
			this._AnchorNode.addChild(this._OuterNode)
			this._OuterNode = this._AnchorNode 
		}
		if (this._OuterTransformNode.hasTransformationApplied()) {
			this._OuterTransformNode.addChild(this._OuterNode)
			this._OuterNode = this._OuterTransformNode
		}

		if(this.lottieLayer.type === 0) {
			this._LayerContent.wrapLayers(animations)
		}
	}

	parentLayers() {
		if (this.lottieLayer.type === 0) {
			this._LayerContent.parentLayers()
		}
	}

	addChild(child) {
		if (this._AnchorNode.hasTransformationApplied()) {
			this._AnchorNode.addChild(child)
		} else {
			this._OuterTransformNode.addChild(child)
		}
	}

	addTrackMask(id) {
		this._LayerContent.addTrackMask(id)
	}

	trackMatteMaskLayers() {
		this._LayerContent.trackMatteMaskLayers()
	}

	get lottieLayer() {
		return this._LottieLayer
	}

	get name() {
		return this._LottieLayer.name
	}

	get inPoint() {
		return this._LottieLayer.inPoint
	}

	get outPoint() {
		return this._LottieLayer.outPoint
	}

	get id() {
		return this._LayerContent.id
	}

	get offsetTime() {
		return this._OffsetTime
	}

	get type() {
		return this._LayerContent.type
	}

	get layerType() {
		return this._LottieLayer.type
	}

	get isTrackMask() {
		return this._LottieLayer.isTrackMask
	}

	get trackMaskType() {
		return this._LottieLayer.trackMaskType
	}

	set previous(child) {
		this._PreviousChild = child
	}

	convert(animations, offsetTime) {
		return this._OuterNode.convert(animations, this.offsetTime)
	}
}