import FlarePrecompLayer from './FlarePrecompLayer';
import nodeId from '../../helpers/nodeId';

export default class FlareArtboard extends FlarePrecompLayer {

	constructor(composition, animations) {
		super(composition, animations, 0);
		this._Composition = composition;
		this.name = 'Composition';
		this.type = 'artboard';
	}

	convert() {
		
		return {
			...super.convert(),
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
			animations: this._Animations.convert(),
		}
	}
}