import rectangle from '../../rectangle'
import ellipse from '../../ellipse'
import path from '../../path'

const convertRectangleType = (data) => {
	const size = data.size
	return rectangle(data.size, data.position, data.roundness, data.drawOrder)
}

const convertEllipseType = (data) => {
	return ellipse(data.size, data.position, data.drawOrder)
}

const convertPathType = (data) => {
	
	return path(data.vertices, data.drawOrder)
}

export {
	convertRectangleType,
	convertPathType,
	convertEllipseType,
}