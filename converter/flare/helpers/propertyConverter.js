import toArray from '../../helpers/toArray'

const convert3dTo2dArray = (arr, multiplier) => {
	return toArray(arr, multiplier)
	.filter((element, index) => index < 2)
}

export default (property, type, animations, nodeId, multiplier = 1) => {
	if (property.animated) {
		animations.addAnimation(property, type, nodeId, multiplier)
		return void 0
	} else {

		if (type == 'translation' || type == 'scale') {
			return convert3dTo2dArray(property.value, multiplier)
		} else if (type == 'rotation' || type == 'opacity') {
			return property.value * multiplier
		} else {
			return toArray(property.value, multiplier)
		}
	}
}