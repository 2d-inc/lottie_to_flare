import transformNode from '../transformNode';
import precomp from '../precomp.js';
import shape from '../shape.js'
import solid from '../solid.js'
import nullElement from '../null.js'
import FlareLayer from './FlareLayer';

export default class FlarePrecompLayer extends FlareLayer {

	constructor(lottieLayer) {

		super(lottieLayer, ()=>{return []})

		this._Content = this.convertLayers(lottieLayer.layers)
	}

	createLayer(layer) {
		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer)
			case 1:
			return new FlareLayer(layer, solid)
			case 3:
			return new FlareLayer(layer, nullElement)
			case 4:
			return new FlareLayer(layer, shape)
			default:
			return null
		}
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

	convertLayers(layers) {
		return layers
		.reverse()
		.map(this.createLayer)
		.reduce(this.nestChildLayers,[])
		.map(child => {return child.convert()})
	}
}