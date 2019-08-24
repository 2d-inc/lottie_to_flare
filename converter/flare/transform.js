import toArray from '../helpers/toArray'

const transform = (transform) => {

	return {
		translation: toArray(transform.position),
		origin: toArray(transform.anchorPoint),
		scale: toArray(transform.scale),
		rotation: transform.rotation,
	}
}

export default transform