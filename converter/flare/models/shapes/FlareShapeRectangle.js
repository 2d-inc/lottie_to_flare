import FlareNode from '../nodes/FlareNode';
import FlareShapeBase from './FlareShapeBase';
import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapeRectangle extends FlareShapeBase{

	convert(animations, offsetTime) {

		const node = new FlareNode('Rectangle Path', [], 'rectangle')

		const translation = convertProperty(this._ShapeData.position, 'translation', animations, node.id, 1, offsetTime)
		const size = convertProperty(this._ShapeData.size, 'size', animations, node.id, 1, offsetTime)
		const cornerRadius = convertProperty(this._ShapeData.roundness, 'cornerRadius', animations, node.id, 1, offsetTime)

		return this.createTransformTree({
			...node.convert(),
			translation,
			width: size[0],
			height: size[1],
			cornerRadius,
		})
	}
}