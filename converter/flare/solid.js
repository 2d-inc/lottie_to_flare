import nodeId from '../helpers/nodeId'
import fill from './fill'
import rectangle from './rectangle'
import transform from './transform'

const solid = async (layer) => {

	return {
		type: "shape",
		id: nodeId(),
		name: "Solid",
		...transform(layer.transform),
		blendMode: "srcOver",
		drawOrder: 1,
		children: [
			fill(layer.color, layer.transform.opacity),
			rectangle(layer.width, layer.height),
		]
	}
}

export default solid