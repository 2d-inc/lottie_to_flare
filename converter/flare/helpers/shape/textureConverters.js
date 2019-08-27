import fill from '../../fill'
import stroke from '../../stroke'

const convertFillType = (data) => {
	return fill(data.color, data.opacity)
}

const convertStrokeType = (data) => {
	return stroke(data.color, data.opacity, data.width, data.lineCap, data.lineJoin)
}

export {
	convertFillType,
	convertStrokeType,
}