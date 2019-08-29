import FlareLayer from './FlareLayer';
import FlareNode from './FlareNode';
import convertProperty from '../helpers/propertyConverter';

export default class FlareContent extends FlareLayer {

	constructor(lottieLayer, animations, converter) {

		super(lottieLayer, animations)

		this._Converter = converter

		// this._Content = this.convertLayers(lottieLayer.layers)
	}

	createContent() {

		const lottieLayer = this._LottieLayer
		const animations = this._Animations

		const name = lottieLayer.name

		let content = this._Converter(lottieLayer)

		if (lottieLayer.transform && lottieLayer.transform.opacity) {
			
			const children = content

			const opacityNode = new FlareNode(name + '_Opacity', children)


			opacityNode.opacity = convertProperty(lottieLayer.transform.opacity, 'opacity', animations, opacityNode.id, 0.01)

			content = [opacityNode.convert()]

		}

		return content

	}
}