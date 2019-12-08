import shapeTypes from '../../../lottie/shapes/shapeTypes.js';
import convertProperty from '../../helpers/propertyConverter';

export default class ShapePaints {

	constructor(paint, nodeId, modifiers, isHidden) {
		this._Paints = []
		this._NodeId = nodeId
		this._Modifiers = modifiers
		this._IsHidden = isHidden
		if (paint) {
			this._Paints.push(paint)
		}
	}

	addPaint(paint) {
		this._Paints.push(paint)
	}

	exportTrim(animations, nodeId, offsetTime) {

		const trimModifier = this._Modifiers.find(modifier => modifier.type === shapeTypes.TRIM_PATH)

		let trimData

		if (trimModifier) {

			const trimStart = convertProperty(trimModifier.start, 'trimStart', animations, nodeId, 0.01, offsetTime)
			const trimEnd = convertProperty(trimModifier.end, 'trimEnd', animations, nodeId, 0.01, offsetTime)
			const trimOffset = convertProperty(trimModifier.offset, 'trimOffset', animations, nodeId, 1 / 360, offsetTime)
			trimData = {
				trim: "sequential",
				trimStart,
				trimEnd,
				trimOffset,
			}
		} else {
			trimData = {
				trim: "off",
				trimStart: 0,
				trimEnd: 1,
				trimOffset: 0,
			}
		}

		return trimData
	}

	convert(animations, offsetTime) {


		const trimModifierData = this.exportTrim(animations, this._NodeId, offsetTime)

		return this._Paints.map(paint => {
			return paint.convert(this._NodeId, animations, offsetTime, trimModifierData, this._IsHidden)
		})
		.filter(paint => !!paint)
	}
}