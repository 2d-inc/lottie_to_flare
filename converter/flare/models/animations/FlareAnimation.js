import toArray from '../../../helpers/toArray'
import nodeId from '../../../helpers/nodeId'

export default class FlareAnimation {

	constructor(composition) {

		this._FPS = composition.frameRate;
		this._InPoint = composition.inPoint;
		this._OutPoint = composition.outPoint;
		this._Offset = 0;
		this._Nodes = {};

		this._Converters = {
			rotation: this.animateRotation.bind(this),
			trimStart: this.animateTrimStart.bind(this),
			trimEnd: this.animateTrimEnd.bind(this),
			trimOffset: this.animateTrimOffset.bind(this),
			translation: this.animateTranslation.bind(this),
			scale: this.animateScale.bind(this),
			opacity: this.animateOpacity.bind(this),
			color: this.animateColor.bind(this),
			strokeWidth: this.animateStroke.bind(this),
		}
	}

	animateScale(keyframes, multiplier, offsetTime) {
		
		const frameScaleX = []
		const frameScaleY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: (keyframe.time + offsetTime) / this._FPS,
			}

			if (index === keyframes.length - 1) {
				props = {
					...props,
					i: 1,
				}
			} else {
				props = {
					...props,
					i: 2,
				}
			}

			const value = keyframe.value

			frameScaleX.push({
				v: value[0] * multiplier,
				curve: outValuesX.concat(inValuesX),
				...props,
			})

			frameScaleY.push({
				v: value[1] * multiplier,
				curve: outValuesY.concat(inValuesY),
				...props,
			})
		})

		return {
			frameScaleX,
			frameScaleY,
		}
	}

	animateColor(keyframes, multiplier, offsetTime) {
		return this.animateMultidimensionalProperty('frameFillColor', keyframes, multiplier, offsetTime)
	}

	animateTranslation(keyframes, multiplier, offsetTime) {
		
		const framePosX = []
		const framePosY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: (keyframe.time + offsetTime) / this._FPS,
			}

			if (index === keyframes.length - 1) {
				props = {
					...props,
					i: 1,
				}
			} else {
				props = {
					...props,
					i: 2,
				}
			}

			const value = keyframe.value

			framePosX.push({
				v: value[0] * multiplier,
				curve: outValuesX.concat(inValuesX),
				...props,
			})

			framePosY.push({
				v: value[1] * multiplier,
				curve: outValuesY.concat(inValuesY),
				...props,
			})
		})

		return {
			framePosX,
			framePosY,
		}
	}

	animateMultidimensionalProperty(propertyName, keyframes, multiplier, offsetTime) {
		return {
			[propertyName]: keyframes.map((keyframe, index) => {
				if (index === keyframes.length - 1) {
					return {
						v: keyframe.value.map(value => value * multiplier),
						t: (keyframe.time + offsetTime) / this._FPS,
						i: 1,
					}
				}
				
				const interpolation = {}
				if (keyframe.interpolationType === 0) {
					interpolation.i = 0
				} else {
					const inValues = toArray(keyframe.in[0])
					const outValues = toArray(keyframe.out[0])
					const curve = outValues.concat(inValues)
					interpolation.i = 2
					interpolation.curve = curve
				}
				return {
					v: keyframe.value.map(value => value * multiplier),
					t: (keyframe.time + offsetTime) / this._FPS,
					...interpolation
				}
			})
		}
	}

	animateUnidimensionalProperty(propertyName, keyframes, multiplier, offsetTime) {

		return {
			[propertyName]: keyframes.map((keyframe, index) => {
				if (index === keyframes.length - 1) {
					return {
						v: keyframe.value[0] * multiplier,
						t: (keyframe.time + offsetTime) / this._FPS,
						i: 1,
					}
				}
				
				const interpolation = {}
				if (keyframe.interpolationType === 0) {
					interpolation.i = 0
				} else {
					const inValues = toArray(keyframe.in[0])
					const outValues = toArray(keyframe.out[0])
					const curve = outValues.concat(inValues)
					interpolation.i = 2
					interpolation.curve = curve
				}
				return {
					v: keyframe.value[0] * multiplier,
					t: (keyframe.time + offsetTime) / this._FPS,
					...interpolation
				}
			})
		}
	}

	animateOpacity(keyframes, multiplier, offsetTime) {

		return this.animateUnidimensionalProperty('frameOpacity', keyframes, multiplier, offsetTime)
	}

	animateStroke(keyframes, multiplier, offsetTime) {

		return this.animateUnidimensionalProperty('frameStrokeWidth', keyframes, multiplier, offsetTime)
	}

	animateRotation(keyframes, multiplier, offsetTime) {
		
		return this.animateUnidimensionalProperty('frameRotation', keyframes, multiplier, offsetTime)
	}

	animateTrimStart(keyframes, multiplier, offsetTime) {
		
		return this.animateUnidimensionalProperty('frameStrokeStart', keyframes, multiplier, offsetTime)
	}

	animateTrimEnd(keyframes, multiplier, offsetTime) {
		
		return this.animateUnidimensionalProperty('frameStrokeEnd', keyframes, multiplier, offsetTime)
	}

	animateTrimOffset(keyframes, multiplier, offsetTime) {
		
		return this.animateUnidimensionalProperty('frameStrokeOffset', keyframes, multiplier, offsetTime)
	}

	addAnimation(property, type, nodeId, multiplier, offsetTime) {

		const node = {
			...this._Nodes[nodeId],
			...this._Converters[type](property.keyframes, multiplier, offsetTime)
		}

		this._Nodes[nodeId] = node;

	}

	addPathAnimation(property, nodeId, verticesNodes, offsetTime) {

		const keyframes = property.keyframes

		const frameVerticesNode = {
			framePathVertices: keyframes.map(keyframe => {
				
				const inValuesX = toArray(keyframe.in[0])
				const outValuesX = toArray(keyframe.out[0])

				const vertices = keyframe.value.vertices
				.reduce((accumulator, vertex, index, all) => {

					const translation = toArray(vertex.position);
					const inPoints = toArray(vertex.in).map((value, index)=> value + translation[index]);
					const outPoints = toArray(vertex.out).map((value, index)=> value + translation[index]);

					accumulator[verticesNodes[index].id] = {
						pos: translation,
						in: inPoints,
						out: outPoints
					}
					return accumulator
				}, {})

				return {
					t: (keyframe.time + offsetTime) / this._FPS,
					v: vertices,
					i: 2,
					curve: outValuesX.concat(inValuesX),
				}
			})
		}

		const node = {
			...this._Nodes[nodeId],
			...frameVerticesNode,
			
		}

		this._Nodes[nodeId] = node;

	}

	offsetAnimations() {
		
	}

	convert() {

		const workAreaStart = this.inPoint / this.frameRate
		const workAreaEnd = this.outPoint / this.frameRate
		const duration = this.outPoint / this.frameRate + 4

		return [{
			displayEnd: duration,
			displayStart: 0,
			duration,
			fps: this._FPS,
			id: nodeId(),
			isWorkAreaActive: true,
			loop: false,
			name: "Animations",
			order: -1,
			nodes: this._Nodes,
			workAreaStart,
			workAreaEnd,
		}];
	}

	get inPoint() {
		return this._InPoint
	}

	get outPoint() {
		return this._OutPoint
	}

	get frameRate() {
		return this._FPS
	}
}