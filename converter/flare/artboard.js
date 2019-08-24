import shape from './shape.js'
import solid from './solid.js'
import nodeId from '../helpers/nodeId'

const convertLayer = async (layer) => {
	switch(layer.type) {
		case 1:
		return solid(layer)
		case 4:
		return shape(layer)
		default:
		return null
	}
}

const convertLayers = async (layers) => {
	return Promise.all(
		layers
		.filter(layer => layer.type !== 3)
		.map(convertLayer)
	)
}

const artboard = async (composition) => {
	
	const children = await convertLayers(composition.layers)

	console.log('artboard', children)

	return {
		type: "artboard",
		id: nodeId(),
		name: "Composition",
		translation: [
		    0,
		    0
		],
		origin: [
		    0,
		    0
		],
		width: composition.width,
		height: composition.height,
		color: [1,0,0,1],
		clipContents: true,
		animations: [],
		children
	}
}

export default artboard