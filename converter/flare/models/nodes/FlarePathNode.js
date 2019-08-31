import FlareNode from './FlareNode'

export default class FlarePathNode extends FlareNode {

	constructor(name = 'NodeName', isClosed = true) {
		super(name, [], 'path')

		this._IsClosed = isClosed
	}

	convert(animations) {
		const node = super.convert(animations)
		return {
			...node,
			isClosed: this._IsClosed,
		}
	}
}