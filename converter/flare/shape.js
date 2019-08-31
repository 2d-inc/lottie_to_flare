import shapeTypes from '../lottie/shapes/shapeTypes.js';
import ShapeCollection from './models/shapes/ShapeCollection';

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
	let lastShape
	items
	.forEach(item => {
		if (item.type === shapeTypes.GROUP) {
			iterateGroup(item.items, shapes, localTransforms, localModifiers)
			lastShape = null
		} else if (item.type === shapeTypes.FILL) {
			const shape = createNewShape(item, localTransforms, localModifiers)
			shapes.push(shape)
			localShapes.push(shape)
			lastShape = shape
		} else if (item.type === shapeTypes.STROKE) {
			if (lastShape) {
				lastShape.addPaint(item)
			} else {
				const shape = createNewShape(item, localTransforms, localModifiers)
				shapes.push(shape)
				localShapes.push(shape)
			}
			lastShape = null
		} else if (item.type === shapeTypes.TRANSFORM) {
			localTransforms.push(item)
			lastShape = null
		} else if (item.type === shapeTypes.TRIM_PATH) {
			localModifiers.push(item)
			lastShape = null
		} else if (pathTypes.includes(item.type)) {
			addPathToShapes(item, shapes, tranforms)
			lastShape = null
		}
	})

	localShapes.forEach(shape => shape.close())

	return shapes
}

const buildShapes = (items, animations, offsetTime) => {
	const tranforms = [];
	const modifiers = [];
	const shapes = iterateGroup(items, [], tranforms, modifiers)
	.map(shapeCollection => shapeCollection.convert(animations, offsetTime));

	return shapes;
}

const shape = (layer, animations, offsetTime) => {

	return buildShapes(layer.items, animations, offsetTime);
}

export default shape