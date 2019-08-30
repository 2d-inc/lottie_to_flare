import FlareLayer from './FlareLayer';
import FlareNode from './FlareNode';
import convertProperty from '../helpers/propertyConverter';

export default class FlareContent extends FlareLayer {

	constructor(lottieLayer, animations, offsetTime, converter) {

		super(lottieLayer, animations, offsetTime)

		this._Converter = converter

	}

	createContentWrapper(content) {

		const lottieLayer = this.lottieLayer
		const animations = this._Animations

		const name = lottieLayer.name

		if (lottieLayer.transform && lottieLayer.transform.opacity) {
			
			const children = content

			const opacityNode = new FlareNode(name + '_Opacity', children)


			opacityNode.opacity = convertProperty(lottieLayer.transform.opacity, 'opacity', animations, opacityNode.id, 0.01)

			content = [opacityNode.convert()]
		}

		if (lottieLayer.inPoint + this.offsetTime > animations.inPoint || lottieLayer.outPoint + this.offsetTime < animations.outPoint) {
			const children = content

			const inOutNode = new FlareNode(name + '_InOut', children)

			const keyframes = []

			if (lottieLayer.inPoint + this.offsetTime > animations.inPoint) {
				keyframes.push({
					interpolationType: 0,
					value: [0],
					time: lottieLayer.inPoint + this.offsetTime - (1 / animations.frameRate)
				})
			}

			keyframes.push({
				interpolationType: 0,
				value: [100],
				time: lottieLayer.inPoint
			},
			{
				interpolationType: 0,
				value: [0],
				time: lottieLayer.outPoint
			})

			inOutNode.opacity = convertProperty({
				animated: true,
				keyframes,
			}, 'opacity', animations, inOutNode.id, 0.01, this.offsetTime)

			content = [inOutNode.convert()]

		}

		return content
	}

	createContent() {

		const lottieLayer = this.lottieLayer
		const animations = this._Animations

		let content = this._Converter(lottieLayer, animations)

		return this.createContentWrapper(content)

	}
}