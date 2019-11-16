import FlareShapeBase from './FlareShapeBase';
import convertProperty from '../../helpers/propertyConverter';

export default class FlareShapeRectangle extends FlareShapeBase {

	constructor(shapeData) {
		super(shapeData, 'Rectangle Path', 'rectangle')
	}

	convert(animations, offsetTime) {

		const translation = convertProperty(this._ShapeData.position, 'translation', animations, this.id, 1, offsetTime)
		const size = convertProperty(this._ShapeData.size, 'size', animations, this.id, 1, offsetTime)
		const cornerRadius = convertProperty(this._ShapeData.roundness, 'cornerRadius', animations, this.id, 1, offsetTime)

		return {
			...super.convert(animations, offsetTime),
			translation,
			width: size[0],
			height: size[1],
			cornerRadius,
		}
	}
}