import transformNode from '../transformNode';
import precomp from '../precomp.js';
import shape from '../shape.js'
import solid from '../solid.js'
import nullElement from '../null.js'
import FlareLayer from './FlareLayer';
import FlareContent from './FlareContent';

export default class FlarePrecompLayer extends FlareLayer {

	constructor(lottieLayer, animations) {

		super(lottieLayer, animations)

		// this._Content = this.convertLayers(lottieLayer.layers)
	}

	createLayer(layer) {
		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, this._Animations)
			case 1:
			return new FlareContent(layer, this._Animations, solid)
			case 3:
			return new FlareContent(layer, this._Animations, nullElement)
			case 4:
			return new FlareContent(layer, this._Animations, shape)
			default:
			return null
		}
	}

	createContent() {
		return this.convertLayers(this._LottieLayer.layers, this._Animations)
	}

	nestParentedChildren(children) {
		children.forEach(child => {
			if (child.lottieLayer.parentId) {
				let parent = children.find(parent => parent.lottieLayer.id === child.lottieLayer.parentId)
				parent.addChild(child)
			}
		})
		return children.filter(child => !child.lottieLayer.parentId)
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

	convertLayers(layers, animations) {
		return layers
		.reverse()
		.map((layer) => this.createLayer(layer))
		.reduce(this.nestChildLayers,[])
		.map(child => {return child.convert(animations)})
	}
}