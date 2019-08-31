import FlareContent from './FlareContent';
import FlareShapeFill from './shapes/FlareShapeFill';
import FlareShapeRectangle from './shapes/FlareShapeRectangle';
import nodeId from '../../helpers/nodeId';

export default class FlareLayerSolid extends FlareContent {

	convertContent() {
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

		return [
			{
				type: "shape",
				id: nodeId(),
				name: "Shape",
				blendMode: "srcOver",
				drawOrder: layer.drawOrder,
				children: [
					shapeFill.convert('', null, null, null),
					shapeRectangle.convert(null, null),
				]
			}
		]

	}
}