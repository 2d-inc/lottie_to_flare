import FlarePrecompLayer from './FlarePrecompLayer';
import nodeId from '../../helpers/nodeId';

export default class FlareArtboard extends FlarePrecompLayer {

	constructor(composition) {
		super(composition)
		this._Composition = composition
	}

	convert() {
		const children = super.convert()
		return {
			type: "artboard",
			id: nodeId(),
			name: "Composition",
			translation: [
			    0,
			    0
			],
			origin: [
			    0,
			    0
			],
			width: this._Composition.width,
			height: this._Composition.height,
			color: [0,0,0,0],
			clipContents: true,
			animations: [],
			children
		}
	}
}