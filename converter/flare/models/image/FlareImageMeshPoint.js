import FlareNode from '../nodes/FlareNode'

export default class FlareImageMeshPoint extends FlareNode {

	constructor(translationX, translationY, uvX, uvY) {
		super("ImageMeshPoint", [], "meshPoint")
		this._Contour = null
		this._Translation = [translationX, translationY]
		this._Uv = [uvX, uvY]
	}

	convert(animations, offset) {

		return {
			...super.convert(animations, offset),
			translation: this._Translation,
			uv: this._Uv,
			contour: this._Contour,
			isForced: false
		}
	}

	set contour(value) {
		this._Contour = value
	}

}