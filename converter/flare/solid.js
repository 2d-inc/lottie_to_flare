import nodeId from '../helpers/nodeId';
import fill from './fill';
import rectangle from './rectangle';

const solid = (layer) => {

	return [
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
	]
}

export default solid