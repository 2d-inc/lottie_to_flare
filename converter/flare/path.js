import nodeId from '../helpers/nodeId'
import toArray from '../helpers/toArray'
import FlarePathNode from './models/nodes/FlarePathNode'
import convertProperty from './helpers/propertyConverter'

const buildVertices = (vertices, animations, nodeId) => {

	return convertProperty(vertices, 'path', animations, nodeId)
	
}

const path = (shapeVerticesProperty, animations) => {

	if (shapeVerticesProperty === null) {
		return
	}

	// Setting path as closed or open depending only on the first shape if animated
	let isClosed
	if (shapeVerticesProperty.animated) {
		isClosed = shapeVerticesProperty.keyframes[0].value.closed
	} else {
		isClosed = shapeVerticesProperty.value.closed
	}
	const shapeNode = new FlarePathNode("Path", isClosed)

	const vertices = buildVertices(shapeVerticesProperty, animations, shapeNode.id)

	shapeNode.addChildren(vertices)

	return shapeNode.convert()
}

export default path

