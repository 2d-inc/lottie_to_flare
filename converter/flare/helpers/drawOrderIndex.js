let drawOrder = 0

export const resetDrawOrderIndex = () => {
	drawOrder = 0
}

export const getDrawOrderIndex = () => {
	return ++drawOrder
}
