import FlareNode from '../nodes/FlareNode'

export default class FlareImageDeformPoint extends FlareNode {

	constructor(translationX, translationY, uvX, uvY) {
		super("ImageDeformMeshPoint", [], "meshDeformPoint")
		this._Translation = [translationX, translationY]
		this._Uv = [uvX, uvY]
	}

	convert(animations, offset) {

		return {
			...super.convert(animations, offset),
			translation: this._Translation,
			uv: this._Uv,
			weights: [
				1,
				0,
				0,
				0,
				1,
				0,
				0,
				0
			]
		}
	}

}