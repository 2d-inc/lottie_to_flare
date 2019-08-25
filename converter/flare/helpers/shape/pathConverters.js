import rectangle from '../../rectangle'
import ellipse from '../../ellipse'
import path from '../../path'

const convertRectangleType = (data) => {
	const size = data.size
	return rectangle(data.size, data.position, data.roundness)
}

const convertEllipseType = (data) => {
	return ellipse(data.size, data.position)
}

const convertPathType = (data) => {
	
	return path(data.vertices)
}

export {
	convertRectangleType,
	convertPathType,
	convertEllipseType,
}