import rectangle from '../../rectangle'
import ellipse from '../../ellipse'
import path from '../../path'

const convertRectangleType = (data, animations, offsetTime) => {
	return rectangle(data.size, data.position, data.roundness, animations, offsetTime)
}

const convertEllipseType = (data, animations, offsetTime) => {
	return ellipse(data.size, data.position, animations, offsetTime)
}

const convertPathType = (data, animations, offsetTime) => {
	return path(data.vertices, animations, offsetTime)
}

export {
	convertRectangleType,
	convertPathType,
	convertEllipseType,
}