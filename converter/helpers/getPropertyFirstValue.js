const getPropertyFirstValue = (property) => {
	if ('a' in property) {
		if (property.a === 0) {
			return property.k
		} else {
			return property.k[0].s
			// TODO: solve keyframed properties
		}
	} else {
		// TODO: solve old json formats and newer ones
	}
}

export const getShapePropertyFirstValue = (property) => {
	if ('a' in property) {
		if (property.a === 0) {
			return property.k
		} else {
			return property.k[0].s[0]
			// TODO: solve keyframed properties
		}
	} else {
		// TODO: solve old json formats and newer ones
	}
}

export default getPropertyFirstValue