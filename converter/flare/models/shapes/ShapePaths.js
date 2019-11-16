export default class ShapePaths {

	constructor(paint) {
		this._Paths = []
	}

	addPath(path) {
		this._Paths.push(path)
	}

	convert(animations, offsetTime) {
		return this._Paths.map((pathData) => pathData.convert(animations, offsetTime))
	}
}