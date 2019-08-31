import toArray from '../../helpers/toArray'
import nodeId from '../../helpers/nodeId'

const oneDimensionalRegularProperties = ['opacity', 'trimStart', 'trimEnd', 'trimOffset']

const convert3dTo2dArray = (arr, multiplier) => {
	return toArray(arr, multiplier)
	.filter((element, index) => index < 2)
}

const convertPath = (shapeVertices) => {

	const vertices = shapeVertices.vertices

	return vertices.map(vertex => {

		const translation = toArray(vertex.position);
		const inPoints = toArray(vertex.in).map((value, index)=> value + translation[index]);
		const outPoints = toArray(vertex.out).map((value, index)=> value + translation[index]);

		return {
			type: "point",
			id: nodeId(),
			name: "Path Point",
			translation,
			in: inPoints,
			out: outPoints,
			pointType: "D",
			radius: 0,
			weights: [],
		}
	})
}

export default (property, type, animations, nodeId, multiplier = 1, offsetTime = 0) => {
	if (property.animated) {
		let convertedProp
		if (type === 'translation' || type === 'scale') {
			convertedProp = convert3dTo2dArray(property.keyframes[0].value, multiplier)
		} else if (oneDimensionalRegularProperties.includes(type)) {
			convertedProp = property.keyframes[0].value * multiplier
		} else if (type === 'rotation') {
			convertedProp = property.keyframes[0].value
		} else if (type === 'path') {
			convertedProp = convertPath(property.keyframes[0].value)
		} else {
			convertedProp = toArray(property.value, multiplier)
		}
		if (type === 'path') {
			animations.addPathAnimation(property, nodeId, convertedProp, offsetTime)
		} else {
			animations.addAnimation(property, type, nodeId, multiplier, offsetTime)
			
		}
		return convertedProp
	} else {
		if (type === 'translation' || type === 'scale') {
			return convert3dTo2dArray(property.value, multiplier)
		} else if (oneDimensionalRegularProperties.includes(type)) {
			return property.value * multiplier
		} else if (type === 'rotation') {
			return property.value
		} else if (type === 'path') {
			return convertPath(property.value)
		} else {
			return toArray(property.value, multiplier)
		}
	}
}