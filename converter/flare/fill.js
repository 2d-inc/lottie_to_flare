import nodeId from '../helpers/nodeId'

const fill = (color, opacity = 1, fillRule = "nonzero") => {
	return {
		type: "colorFill",
		id: nodeId(),
		name: "Color",
		opacity,
		color,
		fillRule,
	}
}

export default fill