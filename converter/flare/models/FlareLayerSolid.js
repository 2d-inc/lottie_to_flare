import FlareLayerContent from './FlareLayerContent';
import FlareShapeFill from './shapes/FlareShapeFill';
import FlareNode from './nodes/FlareNode';
import FlareShapeRectangle from './shapes/FlareShapeRectangle';
import nodeId from '../../helpers/nodeId';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayerSolid extends FlareLayerContent {

	constructor(lottieLayer, isHidden, offsetTime) {
		super(lottieLayer, isHidden, offsetTime)

		const layer = this.lottieLayer

		const shapeFill = new FlareShapeFill({
			color: {
				value: layer.color
			},
			opacity: {
				value: 100
			}
		})

		const shapeRectangle = new FlareShapeRectangle({
			size: {
				value: [layer.width, layer.height]
			},
			position: {
				value: [layer.width / 2, layer.height / 2]
			},
			roundness: {
				value: 0
			}
		})

		const children = [shapeFill, shapeRectangle]

		const child = new FlareNode('Shape', children, 'shape')

		this.addChild(child);

	}

	convert(animations, offsetTime) {

		return {
			...super.convert(animations, offsetTime),
		}
	}
}