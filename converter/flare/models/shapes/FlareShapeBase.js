import FlareNode from '../nodes/FlareNode';

export default class FlareShapeBase extends FlareNode {
	
	constructor(shapeData, name, type) {
		super(name, [], type)
		this._ShapeData = shapeData
	}
}