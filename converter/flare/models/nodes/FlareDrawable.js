import FlareNode from './FlareNode'

export default class FlareDrawable extends FlareNode {

	constructor(drawOrder, isHidden, name = 'Shape', type = 'shape') {
		super(name, [], type)

		this._DrawOrder = drawOrder
		this._IsHidden = isHidden
		this._Opacity = 1
	}

	_exportOpacity() {
		// if(this._Opacity !== 1) {
			return {
				opacity: this._Opacity
			}
		// }
	}

	convert(animations, offset) {

		return {
			...super.convert(animations, offset),
			blendMode: "srcOver",
			drawOrder: this._DrawOrder,
			transformAffectsStroke: true,
			hidden: this._IsHidden,
			// ...this._exportOpacity(),
		}
	}

	/*set opacity(value) {
		this._Opacity = value;
	}*/
}