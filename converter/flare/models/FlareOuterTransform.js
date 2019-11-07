import FlareBaseTransform from './FlareBaseTransform'

export default class FlareOuterTransform extends FlareBaseTransform {

	constructor(layer) {
		super(layer, layer.name + '_Outer')
	}

	traverseTransformProps(transform) {

		if(!transform) {
			return null
		}

		const transformData = {}

		transformData.rotation = transform.rotation.getValueIfNotDefault(0);

		if ('position' in transform) {
			transformData.translation = transform.position.getValueIfNotDefault(0);
		}

		if ('scale' in transform) {
			transformData.scale = transform.scale.getValueIfNotDefault(100);
		}

		const transformOutput = {}

		if (transformData && transformData.translation) {
			transformOutput.translation = transformData.translation
		}

		if (transformData && transformData.rotation) {
			transformOutput.rotation = transformData.rotation
		}

		if (transformData && transformData.scale) {
			transformOutput.scale = transformData.scale
		}

		if (Object.keys(transformOutput).length === 0) {
			return null
		} else {
			return transformOutput
		}
	}
}