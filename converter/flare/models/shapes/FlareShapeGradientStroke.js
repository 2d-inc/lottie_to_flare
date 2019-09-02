import FlareNode from '../nodes/FlareNode'
import FlareGradientStops from '../properties/FlareGradientStops'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';
import {lineCapTypes, lineJoinTypes} from '../../helpers/strokeProperties';
import {nodeTypes as gradientNodeTypes} from '../../helpers/gradientProperties';

export default class FlareShapeGradientStroke {
	
	constructor(paintData) {
		this._PaintData = paintData;
		const nodeType = paintData.gradientType === 1 ? gradientNodeTypes.GRADIENT_STROKE : gradientNodeTypes.RADIAL_GRADIENT_STROKE;
		this._GradientStops = new FlareGradientStops(paintData.color, nodeType);
	}

	convert(id, animations, offsetTime) {

		const paintData = this._PaintData;

		const gradientType = paintData.gradientType;
		const nodeType = gradientType === 1 ? gradientNodeTypes.GRADIENT_STROKE : gradientNodeTypes.RADIAL_GRADIENT_STROKE;

		const node = new FlareNode('Gradient Stroke', null, nodeType);

		const opacity = convertProperty(paintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime);
		node.opacity = opacity
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
			...node.convert(),
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