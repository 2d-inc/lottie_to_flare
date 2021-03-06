import FlareNode from '../nodes/FlareNode'
import FlareGradientStops from '../properties/FlareGradientStops'
import convertProperty, {propertyTypes} from '../../helpers/propertyConverter';
import {nodeTypes as gradientNodeTypes} from '../../helpers/gradientProperties';

export default class FlareShapeGradientFill {
	
	constructor(paintData) {
		this._PaintData = paintData;
		const nodeType = paintData.gradientType === 1 ? gradientNodeTypes.GRADIENT_FILL : gradientNodeTypes.RADIAL_GRADIENT_FILL;
		this._GradientStops = new FlareGradientStops(paintData.color, nodeType);
	}

	convert(id, animations, offsetTime) {

		const paintData = this._PaintData;

		const gradientType = paintData.gradientType;
		const nodeType = gradientType === 1 ? gradientNodeTypes.GRADIENT_FILL : gradientNodeTypes.RADIAL_GRADIENT_FILL;

		const node = new FlareNode('Gradient Fill', null, nodeType);

		const opacity = convertProperty(paintData.opacity, propertyTypes.OPACITY, animations, id, 0.01, offsetTime);
		node.opacity = opacity

		// TODO: Start and End point can't be animated independently from gradient values.
		// The only ones that could be animated are the ones that share same keyframes and interpolatiosn
		// for now, I'm keeping static values
		const start = paintData.startPoint.animated ? paintData.startPoint.firstValue : paintData.startPoint.value;
		const end = paintData.endPoint.animated ? paintData.endPoint.firstValue : paintData.endPoint.value;
		// const start = convertProperty(paintData.startPoint, propertyTypes.GRADIENT_START, animations, id, 1, offsetTime);
		// const end = convertProperty(paintData.endPoint, propertyTypes.GRADIENT_END, animations, id, 1, offsetTime);
		
		const colorStops = this._GradientStops.convert(animations, offsetTime, id, start, end);


		const radialProperties = {}

		// TODO: find out if radial properties are supported
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
		}
	}
}