import fill from '../../fill'

const convertFillType = (data) => {
	console.log(data)
	return fill(data.color, data.opacity)
}

const convertStrokeType = (data) => {
	return {}
}

export {
	convertFillType,
	convertStrokeType,
}