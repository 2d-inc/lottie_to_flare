import nodeId from '../helpers/nodeId';
import fill from './fill';
import rectangle from './rectangle';
import transformNode from './transformNode';
import node from './node';
import toArray from '../helpers/toArray';
import {addChildToLastLeaves} from './helpers/lastLeavesHelper.js';

const solid = async (layer) => {

	const transformerNodes = transformNode(layer.transform)

	addChildToLastLeaves(transformerNodes, 
		{
			type: "shape",
			id: nodeId(),
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: 1,
			children: [
				fill(layer.color, layer.transform.opacity),
				rectangle([layer.width, layer.height], [layer.width / 2, layer.height / 2]),
			]
		}
	);

	return transformerNodes
}

export default solid