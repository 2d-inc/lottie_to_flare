import nodeId from '../helpers/nodeId'
import toArray from '../helpers/toArray'
import FlarePathNode from './models/nodes/FlarePathNode'
import convertProperty from './helpers/propertyConverter'

const buildVertices = (vertices, animations, nodeId, offsetTime) => {
	return convertProperty(vertices, 'path', animations, nodeId, 1, offsetTime)
	
}

const path = (shapeVerticesProperty, animations, offsetTime) => {

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

	const vertices = buildVertices(shapeVerticesProperty, animations, shapeNode.id, offsetTime)

	shapeNode.addChildren(vertices)

	return shapeNode.convert()
}

export default path

