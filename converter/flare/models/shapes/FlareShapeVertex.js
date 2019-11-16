import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapeVertex {
	
	constructor(vertices, nodeId) {
		this._Vertices = vertices
		this._NodeId = nodeId
	}

	convert(animations, offsetTime) {
		return convertProperty(this._Vertices, 'path', animations, this._NodeId, 1, offsetTime)
	}
}