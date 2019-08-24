import fill from '../../fill'

const convertFillType = (data) => {
	return fill(data.color, data.opacity)
}

const convertStrokeType = (data) => {
	return {}
}

export {
	convertFillType,
	convertStrokeType,
}