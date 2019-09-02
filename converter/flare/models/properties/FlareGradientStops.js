import FlareNode from '../nodes/FlareNode';
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';
import {nodeTypes as gradientNodeTypes} from '../../helpers/gradientProperties';

export default class FlareGradientStops {

	constructor(gradientData, gradientType) {
		this._GradientData = gradientData;
		this._Start = null;
		this._End = null;
		this._Type = this.getPropertyType(gradientType);
	}

	getPropertyType(gradientType) {
		switch(gradientType) {
			case gradientNodeTypes.GRADIENT_FILL:
			return propertyTypes.GRADIENT_FILL_STOPS;
			case gradientNodeTypes.RADIAL_GRADIENT_FILL:
			return propertyTypes.GRADIENT_FILL_RADIAL_STOPS;
			case gradientNodeTypes.GRADIENT_STROKE:
			return propertyTypes.GRADIENT_STROKE_STOPS;
			case gradientNodeTypes.RADIAL_GRADIENT_STROKE:
			return propertyTypes.GRADIENT_STROKE_RADIAL_STOPS;
		}
	}

	convert(animations, offsetTime, nodeId, start, end) {

		this._Start = start;
		this._End = end;
		return convertProperty(this, this._Type, animations, nodeId, 1, offsetTime);
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

	get start() {
		return this._Start;
	}

	get end() {
		return this._End;
	}

	get type() {
		return this._Type;
	}

}