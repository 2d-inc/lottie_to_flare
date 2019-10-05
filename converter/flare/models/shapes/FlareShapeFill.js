import FlareNode from '../nodes/FlareNode'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';

export default class FlareFill {
	
	constructor(paintData) {
		this._PaintData = paintData
	}

	convert(id, animations, offsetTime, trimModifiers) {
		if (!this._PaintData.opacity.animated && this._PaintData.opacity.value === 0) {
			return void 0;
		}
		const node = new FlareNode('Color', null, 'colorFill');

		const opacity = convertProperty(this._PaintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime)
		
		node.opacity = opacity

		const color = convertProperty(this._PaintData.color, propertyTypes.COLOR, animations, id, 1, offsetTime)

		const fillRule = "nonzero"

		return {
			...node.convert(),
			color,
			fillRule,
			...trimModifiers,
		}
	}
}