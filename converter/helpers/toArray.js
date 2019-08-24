const toArray = (property) => {
	return Array.prototype.map.call(property, value => value)
}

export default toArray