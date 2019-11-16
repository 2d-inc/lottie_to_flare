import FlareNode from './nodes/FlareNode'
import convertProperty from '../helpers/propertyConverter'

const multipliers = {
	'translation': 1,
	'anchorPoint': -1,
	'scale': 0.01,
	'rotation': Math.PI / 180,
}

export default class FlareBaseTransform extends FlareNode {

	constructor(transform, layerName) {
		super(layerName)
		this._TransformProps = this.traverseTransformProps(transform)
	}

	hasTransformationApplied() {
		return this._TransformProps !== null
	}

	convertTransformations(animations, offsetTime) {
		return Object.keys(this._TransformProps)
		.reduce((properties, key) => {
			const propertyKey = key === 'anchorPoint' ? 'translation' : key
			const multiplier = multipliers[key] || 1
			properties[propertyKey] = convertProperty(this._TransformProps[key], propertyKey, animations, this.id, multiplier, offsetTime)
			return properties
		}, {})
	}

	convert(animations, offsetTime) {
		return {
			...super.convert(animations, offsetTime),
			...this.convertTransformations(animations, offsetTime),
		}
	}
}