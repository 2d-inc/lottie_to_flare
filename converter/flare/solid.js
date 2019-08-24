import nodeId from '../helpers/nodeId'
import fill from './fill'
import rectangle from './rectangle'
import transform from './transform'
import node from './node'
import toArray from '../helpers/toArray'

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

const solid = async (layer) => {

	const transformProps = transform(layer.transform)

	const children = [{
		type: "shape",
		id: nodeId(),
		name: "Shape",
		...getElementTransform(transformProps),
		blendMode: "srcOver",
		drawOrder: 1,
		children: [
			fill(layer.color, layer.transform.opacity),
			rectangle(layer.width, layer.height),
		]
	}]

	return node(children, getNodeTransform(transformProps), 'Solid')
}

export default solid