import FlareLayerContent from './FlareLayerContent';
import FlareShapeFill from './shapes/FlareShapeFill';
import FlareNode from './nodes/FlareNode';
import FlareShapeRectangle from './shapes/FlareShapeRectangle';
import nodeId from '../../helpers/nodeId';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayerSolid extends FlareLayerContent {

	constructor(lottieLayer, isHidden) {
		super(lottieLayer, isHidden)

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

		/*return {
			type: "shape",
			id: nodeId(),
			name: "Shape",
			blendMode: "srcOver",
			drawOrder: layer.drawOrder,
			children: [
				shapeFill.convert('', null, null, null),
				shapeRectangle.convert(null, null),
			],
			hidden: this.visibility !== visibilityModes.VISIBLE,
		}*/

	}

	convert(animations, offsetTime) {

		return {
			...super.convert(animations, offsetTime),
		}
	}
}