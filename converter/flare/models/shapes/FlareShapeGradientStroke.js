import FlareNode from '../nodes/FlareNode'
import FlareGradientStops from '../properties/FlareGradientStops'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';
import {lineCapTypes, lineJoinTypes} from '../../helpers/strokeProperties';
import {nodeTypes as gradientNodeTypes} from '../../helpers/gradientProperties';

export default class FlareShapeGradientStroke extends FlareNode {
	
	constructor(paintData) {
		const nodeType = paintData.gradientType === 1 ? gradientNodeTypes.GRADIENT_STROKE : gradientNodeTypes.RADIAL_GRADIENT_STROKE;
		super('Gradient Stroke', null, nodeType)
		this._PaintData = paintData;
		this._GradientStops = new FlareGradientStops(paintData.color, nodeType);
	}

	convert(id, animations, offsetTime) {

		const paintData = this._PaintData;

		const opacity = convertProperty(paintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime);
		const width = convertProperty(this._PaintData.width, 'strokeWidth', animations, id, 1, offsetTime)

		const start = convertProperty(paintData.startPoint, propertyTypes.GRADIENT_START, animations, id, 1, offsetTime);
		const end = convertProperty(paintData.endPoint, propertyTypes.GRADIENT_END, animations, id, 1, offsetTime);
		const colorStops = this._GradientStops.convert(animations, offsetTime, id, start, end);


		const radialProperties = {}
		//TODO: find out if radial properties are supported
		/*if (gradientType === 2) {
			const secondaryRadiusScale = convertProperty(paintData.highlightLength, propertyTypes.GRADIENT_HIGHLIGHT_LENGTH, animations, id, 0.01, offsetTime);
			radialProperties.secondaryRadiusScale = secondaryRadiusScale
		}*/

		const fillRule = "nonzero"

		return {
			...super.convert(animations, offsetTime),
			opacity,
			colorStops,
			fillRule,
			start,
			end,
			...radialProperties,
			cap: lineCapTypes[this._PaintData.lineCap],
			join: lineJoinTypes[this._PaintData.lineJoin],
			width,
		}
	}
}