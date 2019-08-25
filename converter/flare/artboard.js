import shape from './shape.js'
import solid from './solid.js'
import precomp from './precomp.js'
import nodeId from '../helpers/nodeId'

const convertLayer = async (layer) => {
	switch(layer.type) {
		case 0:
		return precomp(layer)
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
		color: [0,0,0,0],
		clipContents: true,
		animations: [],
		children
	}
}

export default artboard