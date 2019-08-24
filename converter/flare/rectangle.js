import nodeId from '../helpers/nodeId'

const rectangle = (size, translation, cornerRadius = 0) => {
	return {
		type: "rectangle",
		id: nodeId(),
		name: "Rectangle Path",
		translation,
		width: size[0],
		height: size[1],
		cornerRadius,
	}
}

export default rectangle

