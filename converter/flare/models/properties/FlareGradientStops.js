import FlareNode from '../nodes/FlareNode'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter'

export default class FlareGradientStops {

	constructor(gradientData, containerName) {
		this._GradientData = gradientData;
	}

	convert(animations, offsetTime, nodeId) {

		return convertProperty(this, propertyTypes.GRADIENT_STOPS, animations, nodeId, 1, offsetTime)
	}

	get animated() {
		return this._GradientData.color.animated;
	}

	get color() {
		return this._GradientData.color;
	}

	get stops() {
		return this._GradientData.stops;
	}

}