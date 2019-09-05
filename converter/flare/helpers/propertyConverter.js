import toArray from '../../helpers/toArray'
import nodeId from '../../helpers/nodeId'

export const propertyTypes = {
	OPACITY: 'opacity',
	TRIM_START: 'trimStart',
	TRIM_END: 'trimEnd',
	TRIM_OFFSET: 'trimOffset',
	STROKE_WIDTH: 'strokeWidth',
	CORNER_RADIUS: 'cornerRadius',
	TRANSLATION: 'translation',
	SCALE: 'scale',
	SIZE: 'size',
	ROTATION: 'rotation',
	PATH: 'path',
	COLOR: 'color',
	GRADIENT_FILL_STOPS: 'gradientFillStops',
	GRADIENT_FILL_RADIAL_STOPS: 'gradientFillRadialStops',
	GRADIENT_STROKE_STOPS: 'gradientStrokeStops',
	GRADIENT_STROKE_RADIAL_STOPS: 'gradientStrokeRadialStops',
	GRADIENT_START: 'gradientStart',
	GRADIENT_END: 'gradientEnd',
	GRADIENT_HIGHLIGHT_LENGTH: 'gradientHighlightLength',
}

const oneDimensionalRegularProperties = [
	propertyTypes.OPACITY, 
	propertyTypes.TRIM_START, 
	propertyTypes.TRIM_END, 
	propertyTypes.TRIM_OFFSET, 
	propertyTypes.STROKE_WIDTH, 
	propertyTypes.CORNER_RADIUS, 
	propertyTypes.GRADIENT_HIGHLIGHT_LENGTH, 
];

const gradientTypes = [
	propertyTypes.GRADIENT_FILL_STOPS,
	propertyTypes.GRADIENT_FILL_RADIAL_STOPS,
	propertyTypes.GRADIENT_STROKE_STOPS,
	propertyTypes.GRADIENT_STROKE_RADIAL_STOPS,
]

export const createColorStop = (colors, stops, extraValues = []) => {
	const hasAlphaValue = colors.length === stops * 5;

	let count = 0;
	let value = [...extraValues];
	while (count < stops) {
		const index = hasAlphaValue ? count * 5 : count * 4;
		const currentStop = [colors[index + 1], colors[index + 2], colors[index + 3]];
		currentStop.push(hasAlphaValue ? colors[index + 4] : 1);
		currentStop.push(colors[index]);
		value = value.concat(currentStop);
		count += 1;
	}

	return value;
} 

const convertToArray = (arr, multiplier, maxIndex = Number.MAX_SAFE_INTEGER) => {
	return toArray(arr, multiplier)
	.filter((element, index) => index < maxIndex)
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

const convertGradientStops = (gradientData) => {
	const colors = gradientData.color.animated ? gradientData.color.firstValue : gradientData.color.value
	const stops = gradientData.stops;
	return createColorStop(colors, stops);
}

export default (property, type, animations, nodeId, multiplier = 1, offsetTime = 0) => {
	if (property.animated) {
		let convertedProp
		if (type === propertyTypes.TRANSLATION || type === propertyTypes.SCALE || type === propertyTypes.SIZE) {
			convertedProp = convertToArray(property.firstValue, multiplier, 2)
		} else if (oneDimensionalRegularProperties.includes(type)) {
			convertedProp = property.firstValue * multiplier
		} else if (type === propertyTypes.ROTATION) {
			convertedProp = property.firstValue
		} else if (type === propertyTypes.PATH) {
			convertedProp = convertPath(property.firstValue)
		} else if (type === propertyTypes.COLOR) {
			convertedProp = convertToArray(property.firstValue, multiplier)
		} else if (gradientTypes.includes(type)) {
			convertedProp = convertGradientStops(property)
		} else {
			convertedProp = toArray(property.value, multiplier)
		}
		if (type === propertyTypes.PATH) {
			animations.addPathAnimation(property, nodeId, convertedProp, offsetTime)
		} else if (gradientTypes.includes(type)) {
			const propertyNames = {
				[propertyTypes.GRADIENT_FILL_STOPS]: 'frameFillGradient',
				[propertyTypes.GRADIENT_FILL_RADIAL_STOPS]: 'frameFillRadial',
				[propertyTypes.GRADIENT_STROKE_STOPS]: 'frameStrokeGradient',
				[propertyTypes.GRADIENT_STROKE_RADIAL_STOPS]: 'frameStrokeRadial',
			}
			animations.addGradientStopAnimation(property, nodeId, offsetTime, propertyNames[type])
		} else if(type === propertyTypes.TRANSLATION && property.hasSeparateDimensions) {
			animations.addSeparateDimensionsAnimation(property, type, nodeId, multiplier, offsetTime)
		} else {
			animations.addAnimation(property, type, nodeId, multiplier, offsetTime)
		}

		return convertedProp
	} else {
		if (type === propertyTypes.TRANSLATION || type === propertyTypes.SCALE) {
			return convertToArray(property.value, multiplier, 2)
		} else if (oneDimensionalRegularProperties.includes(type)) {
			return property.value * multiplier
		} else if (type === propertyTypes.ROTATION) {
			return property.value
		} else if (type === propertyTypes.PATH) {
			return convertPath(property.value)
		} else if (gradientTypes.includes(type)) {
			return convertGradientStops(property)
		} else {
			return toArray(property.value, multiplier)
		}
	}
}