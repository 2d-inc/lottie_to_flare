import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

export default class FlareOuterTransform extends FlareNode {

	constructor(layer, animations) {
		super(layer.name + '_InOut')
		this._Layer = layer
		this._Animations = animations
	}

	hasInOutPoints() {
		return this._Layer.inPoint + this._Layer.offsetTime > this._Animations.inPoint || this._Layer.outPoint + this._Layer.offsetTime < this._Animations.outPoint
	}

	createInOutPoints() {
		const keyframes = []

		if (this._Layer.inPoint + this._Layer.offsetTime > this._Animations.inPoint) {
			keyframes.push({
				interpolation: 0,
				value: [0],
				time: this._Layer.inPoint + this._Layer.offsetTime - (1 / this._Animations.frameRate)
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
			}, 'opacity', this._Animations, this.id, 0.01, this._Layer.offsetTime)
		}
	}

	convert(animations, offsetTime) {
		return {
			...super.convert(animations, offsetTime),
			...this.createInOutPoints(),
		}
	}
}