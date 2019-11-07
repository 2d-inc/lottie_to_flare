import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

export default class FlareOuterTransform extends FlareNode {

	constructor(layer) {
		super(layer.name + '_InOut')
		this._Layer = layer
	}

	hasInOutPoints() {
		return this._Layer.inPoint + this._Layer.offsetTime > this._Layer.animations.inPoint || this._Layer.outPoint + this._Layer.offsetTime < this._Layer.animations.outPoint
	}

	createInOutPoints() {
		const keyframes = []

		if (this._Layer.inPoint + this._Layer.offsetTime > this._Layer.animations.inPoint) {
			keyframes.push({
				interpolation: 0,
				value: [0],
				time: this._Layer.inPoint + this._Layer.offsetTime - (1 / this._Layer.animations.frameRate)
			})
		}

		keyframes.push({
			interpolation: 0,
			value: [100],
			time: this._Layer.inPoint
		},
		{
			interpolation: 0,
			value: [0],
			time: this._Layer.outPoint
		})

		return {
			opacity: convertProperty({
				animated: true,
				firstValue: keyframes[0].value,
				keyframes,
			}, 'opacity', this._Layer.animations, this.id, 0.01, this._Layer.offsetTime)
		}
	}

	convert() {
		const animations = this._Layer.animations
		const offsetTime = this._Layer.offsetTime
		return {
			...super.convert(animations, offsetTime),
			...this.createInOutPoints(),
		}
	}
}