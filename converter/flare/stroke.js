import nodeId from '../helpers/nodeId'

const lcEnum = {
	1: 'butt',
	2: 'round',
	3: 'square'
}
const ljEnum = {
	1: 'miter',
	2: 'round',
	3: 'bevel'
}

const stroke = (color, opacity = 1, width = 1, cap = 1, join = 1, animations, offsetTime, trimModifierData) => {
	return {
		type: "colorStroke",
		id: nodeId(),
		name: "Color",
		opacity,
		color,
		width,
		cap: lcEnum[cap],
		join: ljEnum[join],
		...trimModifierData,
	}
}

export default stroke