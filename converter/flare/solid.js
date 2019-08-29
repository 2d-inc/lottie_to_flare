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
			drawOrder: layer.drawOrder,
			children: [
				fill(layer.color, 1),
				rectangle([layer.width, layer.height], [layer.width / 2, layer.height / 2]),
			]
		}
	]
}

export default solid