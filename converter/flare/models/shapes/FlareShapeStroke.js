import FlareNode from '../nodes/FlareNode'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';
import {lineCapTypes, lineJoinTypes} from '../../helpers/strokeProperties';

export default class FlareStroke extends FlareNode {
	
	constructor(paintData) {
		super('Color', null, 'colorStroke')
		this._PaintData = paintData
	}

	convert(id, animations, offsetTime, trimModifiers) {

		const opacity = convertProperty(this._PaintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime)
		// this.opacity = opacity

		const color = convertProperty(this._PaintData.color, propertyTypes.STROKE_COLOR, animations, id, 1, offsetTime)

		const width = convertProperty(this._PaintData.width, propertyTypes.STROKE_WIDTH, animations, id, 1, offsetTime)

		return {
			...super.convert(animations, offsetTime),
			color,
			opacity,
			cap: lineCapTypes[this._PaintData.lineCap],
			join: lineJoinTypes[this._PaintData.lineJoin],
			width,
			...trimModifiers,
		}
	}
}