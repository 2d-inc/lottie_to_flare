import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

export default class FlareOpacity extends FlareNode {

	constructor(layer) {
		super(layer.name + '_Opacity')
		this._Layer = layer
		this._Opacity = this._Layer.lottieLayer.transform.opacity.getValueIfNotDefault(100)
	}

	hasOpacity() {
		return !!this._Opacity
	}

	convertOpacity(animations, offsetTime) {
		return {
			opacity:convertProperty(this._Layer.lottieLayer.transform.opacity, 'opacity', animations, this.id, 0.01, offsetTime)
		}
	}

	convert(animations, offsetTime) {
		return {
			...super.convert(animations, offsetTime),
			...this.convertOpacity(animations, offsetTime),
		}
	}
}