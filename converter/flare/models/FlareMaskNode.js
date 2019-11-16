import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'
import ShapeCollection from "./shapes/ShapeCollection"

export default class FlareMaskNode extends FlareNode {

	constructor(layer) {
		super(layer.name + '_Clip')
		this._Layer = layer
		this._Masks = null
		this.createMasks();
	}

	createMasks() {
		if ((this._Layer.lottieLayer.masks && this._Layer.lottieLayer.masks.length)) {
			const shapeData = {
				type: 'fill',
				opacity: {value: 0},
				drawOrder: 0,
				color: { value: [0, 0, 0, 0]},
			}

			const shapeCollection = new ShapeCollection(shapeData)

			this._Layer.lottieLayer.masks.forEach(mask => {
				shapeCollection.addPath(mask, [])
			})

			console.log(shapeCollection)
			this._Masks = shapeCollection
			this.addChild(this._Masks)
		}
	}

	hasMasks() {
		return !!this._Masks
	}

	convertMasks(animations, offsetTime) {
		console.log('convertMasks')

		return {
			clips: [this._Masks.id]
		}
	}

	convert() {
		const animations = this._Layer.animations
		const offsetTime = this._Layer.offsetTime
		return {
			...super.convert(animations, offsetTime),
			...this.convertMasks(animations, offsetTime),
		}
	}
}