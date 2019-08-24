import transformNode from './transformNode';
import shapeTypes from '../lottie/shapes/shapeTypes.js';
import ShapeCollection from './helpers/shape/ShapeCollection';
import {addChildrenToLastLeaves} from './helpers/lastLeavesHelper.js';

const pathTypes = [
	shapeTypes.PATH,
	shapeTypes.RECTANGLE,
]

const createNewShape = (shape, transforms) => {
	return new ShapeCollection(shape, transforms)
}

const addPathToShapes = (path, shapes, transforms) => {
	shapes.forEach(shape => {
		shape.addPath(path, transforms)
	})
}

const iterateGroup = (items, shapes, tranforms) => {

	let len = items.length - 1
	let item
	const localShapes = []
	const localTransforms = [...tranforms]
	while (len >= 0) {
		item = items[len]
		if (item.type === shapeTypes.GROUP) {
			iterateGroup(item.items, shapes, localTransforms)
		} else if (item.type === shapeTypes.FILL) {
			const shape = createNewShape(item, localTransforms)
			shapes.push(shape)
			localShapes.push(shape)
		} else if (item.type === shapeTypes.TRANSFORM) {
			localTransforms.push(item)
		} else if (pathTypes.includes(item.type)) {
			addPathToShapes(item, shapes, tranforms)
		}
		len -= 1
	}

	localShapes.forEach(shape => shape.close())

	return shapes
}

const buildShapes = (items) => {

	const tranforms = [];
	const shapes = iterateGroup(items, [], tranforms)
	.map(shapeCollection => shapeCollection.convert());

	// console.log(shapes)

	return shapes;
}

const shape = async (layer) => {

	const transformerNodes = transformNode(layer.transform);

	const shapes = buildShapes(layer.items);

	addChildrenToLastLeaves(transformerNodes, shapes);

	return transformerNodes;
}

export default shape