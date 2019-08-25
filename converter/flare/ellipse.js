import nodeId from '../helpers/nodeId'

const ellipse = (size, translation) => {
	return {
		type: "ellipse",
		id: nodeId(),
		name: "Ellipse Path",
		translation,
		width: size[0],
		height: size[1],
	}
}

export default ellipse

