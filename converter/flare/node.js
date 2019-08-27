import nodeId from '../helpers/nodeId'

const node = (children = [], transform = {}, name = "Node", opacity = 1) => {

	return {
		type: "node",
		id: nodeId(),
		name,
		...transform,
		opacity,
		displayType: "empty",
		children,
	}
}

export default node