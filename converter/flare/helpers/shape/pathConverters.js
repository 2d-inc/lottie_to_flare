import rectangle from '../../rectangle'
import path from '../../path'

const convertRectangleType = (data) => {
	const size = data.size
	return rectangle(data.size, data.position, data.roundness)
}

const convertPathType = (data) => {
	
	return path(data.vertices)
}

export {
	convertRectangleType,
	convertPathType,
}