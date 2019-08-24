import nodeId from '../helpers/nodeId'
import transformConverter from '../helpers/transformConverter'
import node from './node'

const getNodeTransform = (transformData) => {

	const transformOutput = {}
	if (transformData.translation) {
		transformOutput.translation = transformData.translation
	}
	if (transformData.rotation) {
		transformOutput.rotation = transformData.rotation
	}
	if (transformData.scale) {
		transformOutput.scale = transformData.scale
	}

	return transformOutput
}

const getElementTransform = (transformData) => {
	const transformOutput = {}
	if (transformData.anchorPoint) {
		transformOutput.translation = transformData.anchorPoint.map(value => -value)
	}

	return transformOutput
}

const transformNode = (transform) => {

	const transformProps = transformConverter(transform)

	const children = [node([], getElementTransform(transformProps))]

	return node(children, getNodeTransform(transformProps))
}

export default transformNode