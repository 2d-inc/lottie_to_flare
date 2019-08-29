import toArray from '../../../helpers/toArray'
import nodeId from '../../../helpers/nodeId'

export default class FlareAnimation {

	constructor() {

		this._FPS = 25
		this._Nodes = {};

		this._Converters = {
			rotation: this.animateRotation.bind(this),
			translation: this.animateTranslation.bind(this),
			scale: this.animateScale.bind(this),
			opacity: this.animateOpacity.bind(this),
		}
	}

	animateScale(keyframes, multiplier) {
		
		const frameScaleX = []
		const frameScaleY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: keyframe.time / this._FPS,
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

	animateTranslation(keyframes, multiplier) {
		
		const framePosX = []
		const framePosY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: keyframe.time / this._FPS,
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

	animateOpacity(keyframes, multiplier) {

		return {
			opacity: keyframes.map((keyframe, index) => {
				if (index === keyframes.length - 1) {
					return {
						v: keyframe.value[0] * multiplier,
						t: keyframe.time / this._FPS,
						i: 1,
					}
				}
				
				const inValues = toArray(keyframe.in[0])
				const outValues = toArray(keyframe.out[0])
				return {
					v: keyframe.value[0] * multiplier,
					t: keyframe.time / this._FPS,
					curve: outValues.concat(inValues),
					i: 2,
				}
			})
		}
	}

	animateRotation(keyframes, multiplier) {

		return {
			frameRotation: keyframes.map((keyframe, index) => {
				if (index === keyframes.length - 1) {
					return {
						v: keyframe.value[0] * multiplier,
						t: keyframe.time / this._FPS,
						i: 1,
					}
				}
				
				const inValues = toArray(keyframe.in[0])
				const outValues = toArray(keyframe.out[0])
				return {
					v: keyframe.value[0] * multiplier,
					t: keyframe.time / this._FPS,
					curve: outValues.concat(inValues),
					i: 2,
				}
			})
		}
	}

	addAnimation(property, type, nodeId, multiplier) {

		// console.log('type', type)

		const node = {
			...this._Nodes[nodeId],
			...this._Converters[type](property.keyframes, multiplier)
		}

		this._Nodes[nodeId] = node;

	}

	convert() {
		return [{
			displayEnd: 10,
			displayStart: 0,
			duration: 10,
			fps: this._FPS,
			id: nodeId(),
			isWorkAreaActive: false,
			loop: false,
			name: "Animations",
			order: -1,
			nodes: this._Nodes
		}];
	}
}