import FlareContent from './FlareContent';
import FlareLayer from './FlareLayer';
import {visibilityModes} from '../helpers/visibilityModes.js';
import FlareNode from './nodes/FlareNode';

export default class FlarePrecompLayer extends FlareContent {

	constructor(lottieLayer, offsetTime, isHidden) {
		super(lottieLayer, offsetTime, isHidden)

		this.createLayer = this.createLayer.bind(this)

		this.createLayers();
		this.addChildren(this._Layers);

	}

	createLayer(layer) {

		const offsetTime = this.lottieLayer.startPoint + this.offsetTime
		const isHidden = this.visibility !== visibilityModes.VISIBLE

		return new FlareLayer(layer, offsetTime, isHidden)

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

	linkLayer(child, index, children) {
		child.previous = children[index - 1];
		return child;
	}

	createLayers() {
		const lottieLayers = this.lottieLayer.layers
		this._Layers = lottieLayers
		.reverse()
		.map(this.createLayer)
		.map(this.linkLayer)
		.reduce(this.nestChildLayers,[])
	}

	get layers() {
		return this._Layers;
	}
}