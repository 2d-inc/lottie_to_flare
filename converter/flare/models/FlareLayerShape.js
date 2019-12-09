import FlareLayerContent from './FlareLayerContent';
import shapeTypes from '../../lottie/shapes/shapeTypes.js';
import ShapeCollection from './shapes/ShapeCollection';
import {visibilityModes} from '../helpers/visibilityModes.js';
import FlareNode from './nodes/FlareNode';

const pathTypes = [
	shapeTypes.PATH,
	shapeTypes.RECTANGLE,
	shapeTypes.ELLIPSE,
]

export default class FlareLayerShape extends FlareLayerContent {

	constructor(lottieLayer, isHidden, offsetTime) {
		super(lottieLayer, isHidden, offsetTime)
		this.buildShapes(this.lottieLayer.items, this.visibility !== visibilityModes.VISIBLE)
	}

	createNewShape (shape, transforms, modifiers) {
		return new ShapeCollection(shape, transforms, modifiers)
	}

	addPathToShapes (path, shapes, transforms) {
		shapes.forEach(shape => {
			shape.addPath(path, transforms)
		})
	}

	iterateGroup (items, shapes, tranforms, modifiers) {

		const localShapes = []
		const localTransforms = [...tranforms]
		const localModifiers = [...modifiers]
		let lastShape
		items
		.forEach(item => {
			if (item.type === shapeTypes.GROUP) {
				this.iterateGroup(item.items, shapes, localTransforms, localModifiers)
				lastShape = null
			} else if (item.type === shapeTypes.FILL || item.type === shapeTypes.GRADIENT_FILL) {
				const shape = this.createNewShape(item, localTransforms, localModifiers)
				shapes.push(shape)
				localShapes.push(shape)
				lastShape = shape
			} else if (item.type === shapeTypes.STROKE || item.type === shapeTypes.GRADIENT_STROKE) {
				if (lastShape) {
					lastShape.addPaint(item)
				} else {
					const shape = this.createNewShape(item, localTransforms, localModifiers)
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
				this.addPathToShapes(item, shapes, localTransforms)
				lastShape = null
			}
		})

		localShapes.forEach(shape => shape.close())

		return shapes
	}

	buildShapes(items, isHidden) {
		const tranforms = [];
		const modifiers = [];
		const shapes = this.iterateGroup(items, [], tranforms, modifiers);

		this.addChildren(shapes)

	}

}