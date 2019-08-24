import nodeId from '../helpers/nodeId'

const stroke = (color, opacity = 1, width = 1) => {
	return {
		type: "colorStroke",
		id: nodeId(),
		name: "Color",
		opacity,
		color,
		width,
		cap: "butt",
		join: "miter",
		trim: "off",
		trimStart: 0,
		trimEnd: 1,
		trimOffset: 0
	}
}

export default stroke