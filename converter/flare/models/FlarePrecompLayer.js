import shape from '../shape.js'
import solid from '../solid.js'
import nullElement from '../null.js'
import FlareContent from './FlareContent';

export default class FlarePrecompLayer extends FlareContent {

	constructor(lottieLayer, animations, offsetTime) {
		super(lottieLayer, animations, offsetTime)

		this.createLayer = this.createLayer.bind(this)
	}

	createLayer(layer) {

		const offsetTime = this.lottieLayer.inPoint + this.offsetTime

		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, this._Animations, offsetTime)
			case 1:
			return new FlareContent(layer, this._Animations, offsetTime, solid)
			case 3:
			return new FlareContent(layer, this._Animations, offsetTime, nullElement)
			case 4:
			return new FlareContent(layer, this._Animations, offsetTime, shape)
			default:
			return null
		}
	}

	createContent() {
		const lottieLayer = this.lottieLayer
		const animations = this._Animations

		let content = this.convertLayers(this.lottieLayer.layers, this._Animations)

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

	convertLayers(layers, animations) {
		return layers
		.reverse()
		.map(this.createLayer)
		.reduce(this.nestChildLayers,[])
		.map(child => {return child.convert(animations)})
	}
}