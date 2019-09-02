import FlareNode from '../nodes/FlareNode'
import FlareGradientStops from '../properties/FlareGradientStops'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';

export default class FlareShapeGradientFill {
	
	constructor(paintData) {
		this._PaintData = paintData
		this._GradientStops = new FlareGradientStops(paintData.color)
	}

	convert(id, animations, offsetTime) {

		const paintData = this._PaintData;

		const gradientType = paintData.gradientType;
		const nodeType = gradientType === 1 ? 'gradientFill' : 'radialGradientFill';

		const node = new FlareNode('Radial Gradient Fill', null, nodeType);

		const opacity = convertProperty(paintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime);
		node.opacity = opacity

		const colorStops = this._GradientStops.convert(animations, offsetTime, id);

		const start = convertProperty(paintData.startPoint, propertyTypes.GRADIENT_START, animations, id, 1, offsetTime);
		const end = convertProperty(paintData.endPoint, propertyTypes.GRADIENT_END, animations, id, 1, offsetTime);

		const radialProperties = {}
		
		//TODO: find out if radial properties are supported
		/*if (gradientType === 2) {
			const secondaryRadiusScale = 0.01 || convertProperty(paintData.highlightLength, propertyTypes.GRADIENT_HIGHLIGHT_LENGTH, animations, id, 0.01, offsetTime);
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
		}
	}
}