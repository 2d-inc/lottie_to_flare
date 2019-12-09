import FlareNode from './FlareNode'

export default class FlareDrawable extends FlareNode {

	constructor(drawOrder, isHidden, name = 'Shape', type = 'shape') {
		super(name, [], type)

		this._DrawOrder = drawOrder
		this._IsHidden = isHidden
	}

	convert(animations, offset) {

		return {
			...super.convert(animations, offset),
			blendMode: "srcOver",
			drawOrder: this._DrawOrder,
			transformAffectsStroke: true,
			hidden: this._IsHidden,
		}
	}

}