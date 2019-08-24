const getPropertyFirstValue = (property) => {
	if ('a' in property) {
		if (property.a === 0) {
			return property.k
		} else {
			// TODO: solve keyframed properties
		}
	} else {
		// TODO: solve old json formats and newer ones
	}
}

export default getPropertyFirstValue