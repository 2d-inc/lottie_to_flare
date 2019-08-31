import FlareNode from '../nodes/FlareNode';
import FlareShapeBase from './FlareShapeBase';
import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapeEllipse extends FlareShapeBase {
	
	convert(animations, offsetTime) {

		const node = new FlareNode('Ellipse Path', [], 'ellipse')

		const translation = convertProperty(this._ShapeData.position, 'translation', animations, node.id, 1, offsetTime)
		const size = convertProperty(this._ShapeData.size, 'size', animations, node.id, 1, offsetTime)

		return {
			...node.convert(),
			translation,
			width: size[0],
			height: size[1],
		}
	}
}