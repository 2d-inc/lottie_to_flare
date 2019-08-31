import FlareNode from '../FlareNode'
import convertProperty from '../../helpers/propertyConverter';

const lcEnum = {
	1: 'butt',
	2: 'round',
	3: 'square'
}
const ljEnum = {
	1: 'miter',
	2: 'round',
	3: 'bevel'
}

export default class FlareStroke {
	
	constructor(paintData) {
		this._PaintData = paintData
	}

	convert(id, animations, offsetTime, trimModifiers) {

		const node = new FlareNode('Color', null, 'colorStroke');

		const opacity = convertProperty(this._PaintData.opacity, 'opacity', animations, id, 0.01, offsetTime)
		node.opacity = opacity

		const color = convertProperty(this._PaintData.color, 'color', animations, id, 1, offsetTime)

		const width = convertProperty(this._PaintData.width, 'strokeWidth', animations, id, 1, offsetTime)

		// return stroke(data.color, data.opacity, data.width, data.lineCap, data.lineJoin, animations, offsetTime, trimModifierData)


		return {
			...node.convert(),
			color,
			cap: ljEnum[this._PaintData.lineCap],
			join: ljEnum[this._PaintData.lineJoin],
			width,
		}
	}
}