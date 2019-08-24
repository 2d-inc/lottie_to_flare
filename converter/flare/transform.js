import toArray from '../helpers/toArray'

const getPropertyIfNotDefault = (property, defaultValue) => {
	const arrayProperty = toArray(property)
	const index = arrayProperty.findIndex(val => val !== defaultValue)
	if (index !== -1) {
		return arrayProperty
	}
	return void 0
}

const transform = (transform) => {

	const transformProperties = {}

	if ('rotation' in transform && transform.rotation !== 0) {
		transformProperties.rotation = transform.rotation
	}

	if ('position' in transform) {
		transformProperties.translation = getPropertyIfNotDefault(transform.position, 0)
	}

	if ('scale' in transform) {
		transformProperties.scale = getPropertyIfNotDefault(transform.scale, 1)
	}

	if ('anchorPoint' in transform) {
		transformProperties.anchorPoint = getPropertyIfNotDefault(transform.anchorPoint, 1)
	}

	return transformProperties
}

export default transform