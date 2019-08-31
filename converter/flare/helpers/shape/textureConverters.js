import fill from '../../fill'
import stroke from '../../stroke'
import shapeTypes from '../../../lottie/shapes/shapeTypes.js';

const convertFillType = (data, animations) => {
	return fill(data.color, data.opacity)
}

const convertStrokeType = (data, animations, offsetTime, trimModifierData) => {

	return stroke(data.color, data.opacity, data.width, data.lineCap, data.lineJoin, animations, offsetTime, trimModifierData)
}

export {
	convertFillType,
	convertStrokeType,
}