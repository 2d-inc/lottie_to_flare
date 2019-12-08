import FlarePrecompLayer from './FlarePrecompLayer';
import nodeId from '../../helpers/nodeId';

export default class FlareArtboard extends FlarePrecompLayer {

	constructor(composition, animations) {
		super(composition, false, 0);
		this._Composition = composition;
		this._Animations = animations;
		this.name = 'Composition';
		this.type = 'artboard';
		this.wrapLayers(animations);
		this.parentLayers();
		this.trackMatteMaskLayers();
	}

	convert() {

		return {
			...super.convert(this._Animations, 0),
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