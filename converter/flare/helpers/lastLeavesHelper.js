const iterateNodeChildren = (node, leaves) => {
	const children = node.children;
	if (!children.length) {
		leaves.push(node)
	} else {
		children.map(child => iterateNodeChildren(child, leaves))
	}
	return leaves
}

const getNodeLastLeaves = (node) => {
	
	return iterateNodeChildren(node, [])
}

export const addChildrenToLastLeaves = (node, children) => {
	const leaves = getNodeLastLeaves(node)

	leaves.forEach(leave => {
		children.forEach(child => leave.children.push(child))
	})
}

export const addChildToLastLeaves = (node, child) => {
	addChildrenToLastLeaves(node, [child])
}