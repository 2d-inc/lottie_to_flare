import FlareNode from '../nodes/FlareNode';

export default class FlareShape extends FlareNode {
	
	constructor(shapeData, transforms, name, type) {
		super(name, null, type)
		this._ShapeData = shapeData
	}
}