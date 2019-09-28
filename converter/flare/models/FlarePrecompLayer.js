import FlareContent from './FlareContent';
import FlareLayerNull from './FlareLayerNull';
import FlareLayerSolid from './FlareLayerSolid';
import FlareLayerImage from './FlareLayerImage';
import FlareLayerShape from './FlareLayerShape';
import {visibilityModes} from '../helpers/visibilityModes.js';
import FlareNode from './nodes/FlareNode';

export default class FlarePrecompLayer extends FlareContent {

	constructor(lottieLayer, animations, offsetTime, isHidden) {
		super(lottieLayer, animations, offsetTime, isHidden)

		this.createLayer = this.createLayer.bind(this)
	}

	createLayer(layer) {

		const offsetTime = this.lottieLayer.startPoint + this.offsetTime
		const isHidden = this.visibility !== visibilityModes.VISIBLE

		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, this._Animations, offsetTime, isHidden);
			case 1:
			return new FlareLayerSolid(layer, this._Animations, offsetTime, isHidden);
			case 2:
			return new FlareLayerImage(layer, this._Animations, offsetTime, isHidden);
			case 3:
			return new FlareLayerNull(layer, this._Animations, offsetTime, isHidden);
			case 4:
			return new FlareLayerShape(layer, this._Animations, offsetTime, isHidden);
			default:
			return null
		}
	}

	createContent() {
		const lottieLayer = this.lottieLayer
		const animations = this._Animations
		const offsetTime = this.offsetTime

		let content = this.convertLayers(this.lottieLayer.layers, this._Animations, offsetTime)

		return this.createContentWrapper(content)
	}

	nestChildLayers(remaining, child, index, children) {

		if (child.lottieLayer.parentId) {
			let parent = children.find(parent => parent.lottieLayer.id === child.lottieLayer.parentId)
			parent.addChild(child)
		} else {
			remaining.push(child)
		}
		return remaining
	}

	convertChild(child) {
		return child.convert()
	}

	linkLayer(child, index, children) {
		child.previous = children[index - 1];
		return child;
	}

	convertLayers(lottieLayers) {
		const layers = lottieLayers
		.reverse()
		.map(this.createLayer)
		.map(this.linkLayer)
		.reduce(this.nestChildLayers,[])
		.map(this.convertChild)

		return new FlareNode('Precomp_Container', layers).convert()
	}
}