import rectangle from '../../rectangle'

const convertRectangleType = (data) => {
	const size = data.size
	return rectangle(data.size, data.position, data.roundness)
}

const convertPathType = (data) => {
	
	return rectangle([100,100], [50,50], 0)

	/*return {
		type: 'path'
	}*/
}

export {
	convertRectangleType,
	convertPathType,
}