import nodeId from '../helpers/nodeId'

const node = async (children = [], transform = {}, name = "Node") => {

	return {
		type: "node",
		id: nodeId(),
		name,
		...transform,
		displayType: "empty",
		children,
	}
}

export default node