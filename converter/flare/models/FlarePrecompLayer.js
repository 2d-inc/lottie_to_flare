import FlareContent from './FlareContent';
import FlareLayerNull from './FlareLayerNull';
import FlareLayerSolid from './FlareLayerSolid';
import FlareLayerShape from './FlareLayerShape';

export default class FlarePrecompLayer extends FlareContent {

	constructor(lottieLayer, animations, offsetTime) {
		super(lottieLayer, animations, offsetTime)

		this.createLayer = this.createLayer.bind(this)
	}

	createLayer(layer) {

		const offsetTime = this.lottieLayer.startPoint + this.offsetTime

		switch(layer.type) {
			case 0:
			return new FlarePrecompLayer(layer, this._Animations, offsetTime);
			case 1:
			return new FlareLayerSolid(layer, this._Animations, offsetTime);
			case 3:
			return new FlareLayerNull(layer, this._Animations, offsetTime);
			case 4:
			return new FlareLayerShape(layer, this._Animations, offsetTime);
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

	convertLayers(layers) {
		return layers
		.reverse()
		.map(this.createLayer)
		.reduce(this.nestChildLayers,[])
		.map(child => child.convert())
	}
}