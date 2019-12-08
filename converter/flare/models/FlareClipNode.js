import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'
import ShapeCollection from "./shapes/ShapeCollection"

export default class FlareClipNode extends FlareNode {

	constructor(layer) {
		super(layer.name + '_Clip')
		this._Layer = layer
		this._Clips = null
		this._createClips();
	}

	_createClips() {
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

			this._Clips = shapeCollection
			this.addChild(this._Clips)
		}
	}

	hasClips() {
		return !!this._Clips
	}

	_convertClips(animations, offsetTime) {
		return {
			clips: [this._Clips.id]
		}
	}

	convert(animations, offsetTime) {
		return {
			...super.convert(animations, offsetTime),
			...this._convertClips(animations, offsetTime),
		}
	}
}