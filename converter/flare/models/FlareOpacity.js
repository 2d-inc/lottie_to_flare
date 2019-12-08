import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

export default class FlareOpacity extends FlareNode {

	constructor(transform, layerName) {
		super(layerName + '_Opacity')
		this._Transform = transform
		this._Opacity = transform.opacity.getValueIfNotDefault(100)
	}

	hasOpacity() {
		return !!this._Opacity
	}

	convertOpacity(animations, offsetTime) {
		return {
			opacity:convertProperty(this._Transform.opacity, 'opacity', animations, this.id, 0.01, offsetTime)
		}
	}

	convert(animations, offsetTime) {
		return {
			...super.convert(animations, offsetTime),
			...this.convertOpacity(animations, offsetTime),
		}
	}
}