import rectangle from '../../rectangle'
import ellipse from '../../ellipse'
import path from '../../path'

const convertRectangleType = (data, animations) => {
	const size = data.size
	return rectangle(data.size, data.position, data.roundness, animations)
}

const convertEllipseType = (data, animations) => {
	return ellipse(data.size, data.position, animations)
}

const convertPathType = (data, animations) => {

	return path(data.vertices, animations)
}

export {
	convertRectangleType,
	convertPathType,
	convertEllipseType,
}