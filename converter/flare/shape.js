import shapeTypes from '../lottie/shapes/shapeTypes.js';
import ShapeCollection from './helpers/shape/ShapeCollection';

const pathTypes = [
	shapeTypes.PATH,
	shapeTypes.RECTANGLE,
	shapeTypes.ELLIPSE,
]

const createNewShape = (shape, transforms, modifiers) => {
	return new ShapeCollection(shape, transforms, modifiers)
}

const addPathToShapes = (path, shapes, transforms) => {
	shapes.forEach(shape => {
		shape.addPath(path, transforms)
	})
}

const iterateGroup = (items, shapes, tranforms, modifiers) => {

	const localShapes = []
	const localTransforms = [...tranforms]
	const localModifiers = [...modifiers]
	items
	.forEach(item => {
		if (item.type === shapeTypes.GROUP) {
			iterateGroup(item.items, shapes, localTransforms, localModifiers)
		} else if (item.type === shapeTypes.FILL || item.type === shapeTypes.STROKE) {
			const shape = createNewShape(item, localTransforms, localModifiers)
			shapes.push(shape)
			localShapes.push(shape)
		} else if (item.type === shapeTypes.TRANSFORM) {
			localTransforms.push(item)
		} else if (item.type === shapeTypes.TRIM_PATH) {
			localModifiers.push(item)
		} else if (pathTypes.includes(item.type)) {
			addPathToShapes(item, shapes, tranforms)
		}
	})

	localShapes.forEach(shape => shape.close())

	return shapes
}

const buildShapes = (items, animations) => {
	const tranforms = [];
	const modifiers = [];
	const shapes = iterateGroup(items, [], tranforms, modifiers)
	.map(shapeCollection => shapeCollection.convert(animations));

	return shapes;
}

const shape = (layer, animations) => {

	return buildShapes(layer.items, animations);
}

export default shape