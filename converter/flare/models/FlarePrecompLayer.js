import FlareLayerContent from './FlareLayerContent';
import FlareLayer from './FlareLayer';
import {visibilityModes} from '../helpers/visibilityModes.js';
import FlareNode from './nodes/FlareNode';

export default class FlarePrecompLayer extends FlareLayerContent {

	constructor(lottieLayer, isHidden, offsetTime) {
		super(lottieLayer, isHidden, offsetTime)
		this.createLayer = this.createLayer.bind(this)
		this._Layers = this.createLayers();

	}

	createLayer(layer) {

		const offsetTime = this.lottieLayer.startPoint + this.offsetTime
		const isHidden = this.visibility !== visibilityModes.VISIBLE
		return new FlareLayer(layer, isHidden, offsetTime)

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
		return this.lottieLayer.layers
		.reverse()
		.map(this.createLayer)
		.map(this.linkLayer)
	}

	wrapLayers(animations) {
		this.layers.forEach(layer => layer.wrapLayer(animations))
	}

	trackMatteMaskLayers() {
		this.layers.forEach((layer, index) => {
			if (layer.isTrackMask && index < this.layers.length - 1) {
				this.layers[index + 1].addTrackMask(layer.id)
			}
			if (layer.layerType === 0) {
				layer.trackMatteMaskLayers()
			}
		})
	}

	parentLayers() {
		this.layers.forEach(layer => layer.parentLayers())
		const childLayers = this.layers
		.reduce(this.nestChildLayers,[])
		this.addChildren(childLayers);
	}

	get layers() {
		return this._Layers;
	}
}