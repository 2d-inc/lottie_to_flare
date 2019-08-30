import node from '../../node'
import FlareNode from '../FlareNode'
import convertProperty from '../../helpers/propertyConverter'

const multipliers = {
	'translation': 1,
	'anchorPoint': -1,
	'scale': 0.01,
	'rotation': Math.PI / 180,
}

export default class FlareTransform {

	constructor(transformData, containerName) {

		const transformProps = this.traverseTransformProps(transformData)
		this._AnchorPointTransform = this.getAnchorPointTransform(transformProps)
		this._OuterTransform = this.getOuterPointTransform(transformProps)
		this._ContainerName = containerName
	}

	getPropertyIfNotDefault(property, defaultValue) {

		let returnValue = void 0

		if (property.animated) {
			returnValue = property
		} else {
			if(property.animatable) {
				returnValue = property
			} else {
				returnValue = {
					value: property
				}
			}

			if (returnValue.value.length) {
				const index = returnValue.value.findIndex(val => val !== defaultValue)
				if (index === -1) {
					returnValue = void 0
				}
			}
		}

		return returnValue
	}

	traverseTransformProps(transform) {

		if(!transform) {
			return null
		}

		const transformProperties = {}

		/*if ('rotation' in transform && transform.rotation !== 0) {
			transformProperties.rotation = transform.rotation
		}*/

		transformProperties.rotation = this.getPropertyIfNotDefault(transform.rotation, 0)

		if ('position' in transform) {
			transformProperties.translation = this.getPropertyIfNotDefault(transform.position, 0)
		}

		if ('scale' in transform) {
			transformProperties.scale = this.getPropertyIfNotDefault(transform.scale, 100)
		}

		if ('anchorPoint' in transform) {
			transformProperties.anchorPoint = this.getPropertyIfNotDefault(transform.anchorPoint, 0)
		}

		if ('opacity' in transform) {
			transformProperties.opacity = this.getPropertyIfNotDefault(transform.opacity, 1)
		}

		return transformProperties
	}

	getAnchorPointTransform(transformData) {
		
		if (transformData && transformData.anchorPoint) {
			return {
				anchorPoint: transformData.anchorPoint
			}
		}

		return null
	}

	getOuterPointTransform(transformData) {

		const transformOutput = {}

		if (transformData && transformData.translation) {
			transformOutput.translation = transformData.translation
		}

		if (transformData && transformData.rotation) {
			transformOutput.rotation = transformData.rotation
		}

		if (transformData && transformData.scale) {
			transformOutput.scale = transformData.scale
		}

		if (Object.keys(transformOutput).length === 0) {
			return null
		} else {
			return transformOutput
		}
	}

	convertTransformations(transforms, animations, nodeId, offsetTime) {
		return Object.keys(transforms)
		.reduce((properties, key) => {
			const propertyKey = key === 'anchorPoint' ? 'translation' : key
			const multiplier = multipliers[key] || 1
			properties[propertyKey] = convertProperty(transforms[key], propertyKey, animations, nodeId, multiplier, offsetTime)
			return properties
		}, {})
	}

	convert(animations, offsetTime) {

		if (!this._AnchorPointTransform && !this._OuterTransform) {
			return null
		}

		let anchorNode
		if (this._AnchorPointTransform) {

			anchorNode = new FlareNode(this._ContainerName + '_Anchor')
			const anchorPointTransform = this.convertTransformations(this._AnchorPointTransform, animations, anchorNode.id, offsetTime)
			anchorNode.transform = anchorPointTransform
		}

		if (this._OuterTransform) {

			const outerChildren = []
			if (anchorNode) {
				outerChildren.push(anchorNode.convert())
			}
			const outerNode = new FlareNode(this._ContainerName + '_Outer', outerChildren)
			const outerTransform = this.convertTransformations(this._OuterTransform, animations, outerNode.id, offsetTime)
			outerNode.transform = outerTransform

			return outerNode.convert()
		} else {
			return anchorNode.convert()
		}
		
	}

}