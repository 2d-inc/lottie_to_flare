import FlareLayer from './FlareLayer';
import FlareNode from './nodes/FlareNode';
import convertProperty from '../helpers/propertyConverter';
import ShapeCollection from "./shapes/ShapeCollection";

export default class FlareContent extends FlareLayer {

	constructor(lottieLayer, animations, offsetTime, isHidden) {

		super(lottieLayer, animations, offsetTime, isHidden)
		
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

			const maskNode = new FlareNode(name + '_Clip', content)
			maskNode.clips = [shapeCollection.id]

			content = maskNode
		}

		if (this._Transforms && this._Transforms.opacity) {

			const children = content

			const opacityNode = new FlareNode(name + '_Opacity', children)


			opacityNode.opacity = convertProperty(lottieLayer.transform.opacity, 'opacity', animations, opacityNode.id, 0.01, offsetTime)

			content = opacityNode
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

			content = inOutNode
		}

		return content
	}

	_createContentWrapper(content) {

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

			content = [content, convertedMask]

			const maskNode = new FlareNode(name + '_Clip', content)
			maskNode.clips = [convertedMask.id]

			content = maskNode.convert()
		}

		if (this._Transforms && this._Transforms.opacity) {

			const children = content

			const opacityNode = new FlareNode(name + '_Opacity', children)


			opacityNode.opacity = convertProperty(lottieLayer.transform.opacity, 'opacity', animations, opacityNode.id, 0.01, offsetTime)

			content = opacityNode.convert()
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

			content = inOutNode.convert()

		}


		return content
	}

	createContent() {
		return []
	}

	_createContent() {

		const lottieLayer = this.lottieLayer
		const animations = this._Animations
		const offsetTime = this.offsetTime

		let content = this.convertContent(lottieLayer, animations, offsetTime)

		return this.createContentWrapper(content)

	}
}