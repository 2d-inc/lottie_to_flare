import nodeId from '../../../helpers/nodeId';
import FlareNode from '../FlareNode'
import convertProperty from '../../helpers/propertyConverter';

export default class FlareFill {
	
	constructor(paintData) {
		this._PaintData = paintData
	}

	convert(id, animations, offsetTime, trimModifiers) {

		const node = new FlareNode('Color', null, 'colorFill');

		const opacity = convertProperty(this._PaintData.opacity, 'opacity', animations, id, 0.01, offsetTime)
		node.opacity = opacity

		const color = convertProperty(this._PaintData.color, 'color', animations, id, 1, offsetTime)

		const fillRule = "nonzero"

		return {
			...node.convert(),
			color,
			fillRule,
		}
	}
}