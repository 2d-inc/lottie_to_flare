import nodeId from '../helpers/nodeId';
import transformNode from './transformNode';
import {addChildrenToLastLeaves} from './helpers/lastLeavesHelper.js';
import shape from './shape.js';
import solid from './solid.js';

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

const precomp = async (layer) => {

	const children = await convertLayers(layer.layers)

	const transformerNodes = transformNode(layer.transform)

	addChildrenToLastLeaves(transformerNodes, children)


	return transformerNodes
}

export default precomp