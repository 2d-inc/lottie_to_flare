import FlareBaseTransform from './FlareBaseTransform'

export default class FlareAnchorTransform extends FlareBaseTransform {

	constructor(transform, layerName) {
		super(transform, layerName + '_Anchor')
	}

	traverseTransformProps(transform) {

		if(!transform) {
			return null
		}

		const transformData = {}

		transformData.rotation = transform.rotation.getValueIfNotDefault(0);

		if ('anchorPoint' in transform) {
			transformData.anchorPoint = transform.anchorPoint.getValueIfNotDefault(0);
		}

		const transformOutput = {}

		if (transformData.anchorPoint) {
			return {
				anchorPoint: transformData.anchorPoint
			}
		}

		if (Object.keys(transformOutput).length === 0) {
			return null
		} else {
			return transformOutput
		}
	}
}