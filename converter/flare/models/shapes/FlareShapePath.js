import FlareShapeBase from './FlareShapeBase';
import FlarePathNode from '../nodes/FlarePathNode';
import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapePath extends FlareShapeBase {

	buildVertices(vertices, animations, nodeId, offsetTime) {
		return convertProperty(vertices, 'path', animations, nodeId, 1, offsetTime)
	}

	convert(animations, offsetTime) {

		const shapeData = this._ShapeData
		const verticesData = shapeData.vertices

		// Setting path as closed or open depending only on the first shape if animated
		const isClosed = verticesData.animated ? verticesData.firstValue.closed : verticesData.value.closed

		const shapeNode = new FlarePathNode("Path", isClosed)

		const vertices = this.buildVertices(verticesData, animations, shapeNode.id, offsetTime)

		shapeNode.addChildren(vertices)

		return shapeNode.convert()
	}
}