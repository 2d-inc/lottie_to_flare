import FlareLayer from './FlareLayer';
import FlareNode from './nodes/FlareNode';
import convertProperty from '../helpers/propertyConverter';
import ShapeCollection from "./shapes/ShapeCollection";

export default class FlareContent extends FlareLayer {

	constructor(lottieLayer, animations, offsetTime, converter) {

		super(lottieLayer, animations, offsetTime)

		this._Converter = converter

	}

	createContentWrapper(content) {

		const lottieLayer = this.lottieLayer
		const animations = this._Animations
		const offsetTime = this.offsetTime

		const name = lottieLayer.name

		if (lottieLayer.masks && lottieLayer.masks.length) {

			const shapeData = {
				type: 'fill',
				opacity: {value: 0},
				drawOrder: 0,
				color: { value: [0, 0, 0, 0]},
			}

			const shapeCollection = new ShapeCollection(shapeData)

			lottieLayer.masks.forEach(mask => {
				shapeCollection.addPath(mask, [])
			})

			const convertedMask = shapeCollection.convert(animations, offsetTime)
			content.push(convertedMask)

			const maskNode = new FlareNode(name + '_Clip', content)
			maskNode.clips = [convertedMask.id]

			content = [maskNode.convert()]
		}

		if (lottieLayer.transform && lottieLayer.transform.opacity) {
			
			const children = content

			const opacityNode = new FlareNode(name + '_Opacity', children)


			opacityNode.opacity = convertProperty(lottieLayer.transform.opacity, 'opacity', animations, opacityNode.id, 0.01, offsetTime)

			content = [opacityNode.convert()]
		}

		if (lottieLayer.inPoint + this.offsetTime > animations.inPoint || lottieLayer.outPoint + this.offsetTime < animations.outPoint) {
			const children = content

			const inOutNode = new FlareNode(name + '_InOut', children)

			const keyframes = []

			if (lottieLayer.inPoint + this.offsetTime > animations.inPoint) {
				keyframes.push({
					interpolation: 0,
					value: [0],
					time: lottieLayer.inPoint + this.offsetTime - (1 / animations.frameRate)
				})
			}

			keyframes.push({
				interpolation: 0,
				value: [100],
				time: lottieLayer.inPoint
			},
			{
				interpolation: 0,
				value: [0],
				time: lottieLayer.outPoint
			})

			inOutNode.opacity = convertProperty({
				animated: true,
				firstValue: keyframes[0].value,
				keyframes,
			}, 'opacity', animations, inOutNode.id, 0.01, offsetTime);

			content = [inOutNode.convert()]

		}

		return content
	}

	createContent() {

		const converter = this.convertContent || this._Converter

		const lottieLayer = this.lottieLayer
		const animations = this._Animations
		const offsetTime = this.offsetTime

		let content = this.convertContent(lottieLayer, animations, offsetTime)

		return this.createContentWrapper(content)

	}
}