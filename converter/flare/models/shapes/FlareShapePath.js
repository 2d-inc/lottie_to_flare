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
}