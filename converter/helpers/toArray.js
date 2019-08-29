const toArray = (property, multiplier = 1) => {
	return Array.prototype.map.call(property, value => value * multiplier)
}

export default toArray