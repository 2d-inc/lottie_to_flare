import toArray from '../../../helpers/toArray'
import nodeId from '../../../helpers/nodeId'
import {createColorStop, propertyTypes} from '../../helpers/propertyConverter'

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
			strokeColor: this.animateStrokeColor.bind(this),
			strokeWidth: this.animateStroke.bind(this),
			cornerRadius: this.animateCornerRadius.bind(this),
			size: this.animateSize.bind(this),
		}
	}

	animateScale(keyframes, multiplier, offsetTime) {
		return this.animateMultiNamedProperty(keyframes, multiplier, offsetTime, ['frameScaleX', 'frameScaleY'])
	}

	animateColor(keyframes, multiplier, offsetTime) {
		return this.animateMultidimensionalProperty('frameFillColor', keyframes, multiplier, offsetTime)
	}

	animateStrokeColor(keyframes, multiplier, offsetTime) {
		return this.animateMultidimensionalProperty('frameStrokeColor', keyframes, multiplier, offsetTime)
	}

	animateTranslation(keyframes, multiplier, offsetTime) {
		return this.animateMultiNamedProperty(keyframes, multiplier, offsetTime, ['framePosX', 'framePosY'])
	}

	createInterpolationData(keyframe, nextKeyframe, dimension = 0) {
		let interpolation;
		if (keyframe.interpolation === 0) {
			interpolation = {
				i: 0
			};
		} else if(keyframe && nextKeyframe && (nextKeyframe.time - keyframe.time) <= 1) {
			interpolation = {
				i: 0
			}
		} else {
			const inValues = toArray(keyframe.in[dimension]);
			const outValues = toArray(keyframe.out[dimension]);
			interpolation = {
				curve: outValues.concat(inValues),
				i: 2,
			};
			
		}
		return interpolation;
	}

	animateMultiNamedProperty(keyframes, multiplier, offsetTime, names) {
		const nameArrays = names.map(() => [])

		keyframes.forEach((keyframe, index) => {

			let props = {
				t: (keyframe.time + offsetTime) / this._FPS,
			}

			const value = keyframe.value

			nameArrays[0].push({
				v: value[0] * multiplier,
				...this.createInterpolationData(keyframe, keyframes[index + 1], 0),
				...props,
			})

			nameArrays[1].push({
				v: value[1] * multiplier,
				...this.createInterpolationData(keyframe, keyframes[index + 1], 1),
				...props,
			})
		})

		return names.reduce((accumulator, value, index) => {
			accumulator[value] = nameArrays[index]
			return accumulator
		}, {})
	}

	animateSize(keyframes, multiplier, offsetTime) {
		return this.animateMultiNamedProperty(keyframes, multiplier, offsetTime, ['frameWidth', 'frameHeight'])
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
				
				return {
					v: keyframe.value.map(value => value * multiplier),
					t: (keyframe.time + offsetTime) / this._FPS,
					...this.createInterpolationData(keyframe, keyframes[index + 1], 0),

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
				
				return {
					v: keyframe.value[0] * multiplier,
					t: (keyframe.time + offsetTime) / this._FPS,
					...this.createInterpolationData(keyframe, keyframes[index + 1], 0),
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

	animateCornerRadius(keyframes, multiplier, offsetTime) {

		return this.animateUnidimensionalProperty('frameCornerRadius', keyframes, multiplier, offsetTime)
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

	addSeparateDimensionsAnimation(property, type, nodeId, multiplier, offsetTime) {

		let node = {
			...this._Nodes[nodeId],
		}
		const x = property.x;
		const y = property.y;

		if (x.animated) {
			node = {
				...node,
				...this.animateUnidimensionalProperty('framePosX', x.keyframes, multiplier, offsetTime)
			}
		}

		if (y.animated) {
			node = {
				...node,
				...this.animateUnidimensionalProperty('framePosY', y.keyframes, multiplier, offsetTime)
			}
		}

		this._Nodes[nodeId] = node;

	}

	addPathAnimation(property, nodeId, verticesNodes, offsetTime) {

		const keyframes = property.keyframes

		const frameVerticesNode = {
			framePathVertices: keyframes.map((keyframe, keyframeIndex) => {
				
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
					...this.createInterpolationData(keyframe, keyframes[keyframeIndex + 1], 0),
				}
			})
		}

		const node = {
			...this._Nodes[nodeId],
			...frameVerticesNode,
			
		}

		this._Nodes[nodeId] = node;

	}

	addGradientStopAnimation(property, nodeId, offsetTime, propertyName) {

		const start = property.start;
		const end = property.end;
		let extraValues = [];
		if (property.type === propertyTypes.GRADIENT_FILL_RADIAL_STOPS 
			|| property.type === propertyTypes.GRADIENT_STROKE_RADIAL_STOPS) 
		{
			// this is the "secondaryRadiusScale"
			extraValues.push(1);
		}
		extraValues = extraValues.concat(start).concat(end);
		const stops = property.stops;
		const keyframes = property.color.keyframes;
		const fillAnimation = {
			[propertyName]: keyframes.map((keyframe, index) => {


				const colors = keyframe.value;

				const value = createColorStop(colors, stops, extraValues);

				return {
					t: (keyframe.time + offsetTime) / this._FPS,
					v: value,
					...this.createInterpolationData(keyframe, keyframes[index + 1], 0)
				}
			})
		}
		const node = {
			...this._Nodes[nodeId],
			...fillAnimation,
			
		}

		this._Nodes[nodeId] = node;
	}

	getMinimumKeyframeTime() {
		let offset = 0;
		const nodes = Object.keys(this._Nodes)
		nodes.forEach(nodeId => {
			const node = this._Nodes[nodeId];
			const animations = Object.keys(node);
			animations.forEach(propName => {
				const keyframes = node[propName];
				offset = Math.min(offset, keyframes[0].t);
			})
		})
		return offset;
	}

	offsetAnimations(offsetTime) {
		const nodes = Object.keys(this._Nodes)
		nodes.forEach(nodeId => {
			const node = this._Nodes[nodeId];
			const animations = Object.keys(node);
			animations.forEach(propName => {
				const keyframes = node[propName];
				keyframes.forEach(keyframe => {
					keyframe.t += offsetTime;
				})
			})
		})
	}

	convert() {

		let initialOffsetTime = -this.getMinimumKeyframeTime();
		// minTime = 0;

		if (initialOffsetTime > 0) {
			this.offsetAnimations(initialOffsetTime);
		}

		const workAreaStart = this.inPoint / this.frameRate + initialOffsetTime
		const workAreaEnd = this.outPoint / this.frameRate + initialOffsetTime
		const duration = this.outPoint / this.frameRate + 4 + initialOffsetTime

		return [{
			displayEnd: duration,
			displayStart: Math.max(0, workAreaStart - 1),
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