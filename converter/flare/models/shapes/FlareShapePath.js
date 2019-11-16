import FlareShapeBase from './FlareShapeBase';
import FlareShapeVertex from './FlareShapeVertex';
import FlarePathNode from '../nodes/FlarePathNode';
import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapePath extends FlareShapeBase {

	constructor(shapeData) {
		super(shapeData, 'Path', 'path')
		const verticesData = shapeData.vertices
		this._IsClosed = verticesData.animated ? verticesData.firstValue.closed : verticesData.value.closed
		const vertices = new FlareShapeVertex(verticesData, this.id)
		this.addChild(vertices)
	}

	convert(animations, offsetTime) {

		return {
			...super.convert(animations, offsetTime),
			isClosed: this._IsClosed,
		}
	}

	__buildVertices(vertices, animations, nodeId, offsetTime) {
		return convertProperty(vertices, 'path', animations, nodeId, 1, offsetTime)
	}

	__convert(animations, offsetTime) {

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