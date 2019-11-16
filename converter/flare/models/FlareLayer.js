import FlareContent from './FlareContent';
import FlareLayerNull from './FlareLayerNull';
import FlareLayerSolid from './FlareLayerSolid';
import FlareLayerImage from './FlareLayerImage';
import FlareLayerShape from './FlareLayerShape';
import FlareOuterTransform from './FlareOuterTransform';
import FlareAnchorTransform from './FlareAnchorTransform';
import FlareOpacity from './FlareOpacity';
import FlareInOut from './FlareInOut';
import FlareMaskNode from './FlareMaskNode';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayer
{

	constructor(lottieLayer, offsetTime, isHidden)
	{
		this._LottieLayer = lottieLayer
		this._OffsetTime = offsetTime
		this._LayerContent = this.createContent(lottieLayer, isHidden)
		this.wrapLayer()
	}

	createContent(layer, isHidden) {

		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, isHidden);
			case 1:
			return new FlareLayerSolid(layer, isHidden);
			case 2:
			return new FlareLayerImage(layer, isHidden);
			case 3:
			return new FlareLayerNull(layer, isHidden);
			case 4:
			return new FlareLayerShape(layer, isHidden);
			default:
			return null
		}

	}

	wrapLayer() {
		this._OuterNode = this._LayerContent
		this._MaskNode = new FlareMaskNode(this._LayerContent)
		this._OpacityNode = new FlareOpacity(this._LayerContent)
		this._InOutNode = new FlareInOut(this._LayerContent)
		this._AnchorNode = new FlareAnchorTransform(this._LottieLayer.transform, this._LayerContent.name)
		this._OuterTransformNode = new FlareOuterTransform(this._LottieLayer.transform, this._LayerContent.name)

		if (this._MaskNode.hasMasks()) {
			this._MaskNode.addChild(this._OuterNode)
			this._OuterNode = this._MaskNode
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
	}

	addChild(child) {
		if (this._AnchorNode.hasTransformationApplied()) {
			this._AnchorNode.addChild(child)
		} else {
			this._OuterTransformNode.addChild(child)
		}
	}

	get lottieLayer() {
		return this._LottieLayer
	}

	set previous(child) {
		this._PreviousChild = child
	}

	convert(animations, offsetTime) {
		return this._OuterNode.convert(animations, this._OffsetTime)
	}
}