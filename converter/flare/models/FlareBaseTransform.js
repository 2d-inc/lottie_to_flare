import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

const multipliers = {
	'translation': 1,
	'anchorPoint': -1,
	'scale': 0.01,
	'rotation': Math.PI / 180,
}

export default class FlareBaseTransform extends FlareNode {

	constructor(layer, layerName) {
		super(layerName)
		this._Layer = layer
		this._TransformProps = this.traverseTransformProps(layer.lottieLayer.transform)
	}

	hasTransformationApplied() {
		return this._TransformProps !== null
	}

	convertTransformations(animations, offsetTime) {
		const nodeId = this._Layer.id
		return Object.keys(this._TransformProps)
		.reduce((properties, key) => {
			const propertyKey = key === 'anchorPoint' ? 'translation' : key
			const multiplier = multipliers[key] || 1
			properties[propertyKey] = convertProperty(this._TransformProps[key], propertyKey, animations, nodeId, multiplier, offsetTime)
			return properties
		}, {})
	}

	convert() {
		const animations = this._Layer.animations
		const offsetTime = this._Layer.offsetTime
		return {
			...super.convert(animations, offsetTime),
			...this.convertTransformations(animations, offsetTime),
		}
	}
}