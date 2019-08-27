import shapeTypes from '../lottie/shapes/shapeTypes.js';
import ShapeCollection from './helpers/shape/ShapeCollection';

const pathTypes = [
	shapeTypes.PATH,
	shapeTypes.RECTANGLE,
	shapeTypes.ELLIPSE,
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

	const localShapes = []
	const localTransforms = [...tranforms]
	items
	.forEach(item => {
		if (item.type === shapeTypes.GROUP) {
			iterateGroup(item.items, shapes, localTransforms)
		} else if (item.type === shapeTypes.FILL) {
			const shape = createNewShape(item, localTransforms)
			shapes.push(shape)
			localShapes.push(shape)
		} else if (item.type === shapeTypes.STROKE) {
			const shape = createNewShape(item, localTransforms)
			shapes.push(shape)
			localShapes.push(shape)
		} else if (item.type === shapeTypes.TRANSFORM) {
			localTransforms.push(item)
		} else if (pathTypes.includes(item.type)) {
			addPathToShapes(item, shapes, tranforms)
		}
	})

	localShapes.forEach(shape => shape.close())

	return shapes
}

const buildShapes = (items) => {

	const tranforms = [];
	const shapes = iterateGroup(items, [], tranforms)
	.map(shapeCollection => shapeCollection.convert());

	return shapes;
}

const shape = (layer) => {

	return buildShapes(layer.items);
}

export default shape