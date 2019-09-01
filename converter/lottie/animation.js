import deserialize from "./deserialize.js";
import PrecompLayer from "./layers/precomp_layer.js";
import ShapeLayer from "./layers/shape_layer.js";
import SolidLayer from "./layers/solid_layer.js";
import ImageLayer from "./layers/image_layer.js";
import Layer from "./layers/layer.js";

export default class Animation
{
	constructor()
	{
		this._Name = null;
		this._Height = null;
		this._Width = null;
		this._InPoint = null;
		this._OutPoint = null;
		this._Layers = null;
		this._FrameRate = 0;
	}

	deserialize(json)
	{
		deserialize.string(json['v'], (value) =>
		{
			this._Version = value;
		});

		deserialize.string(json['nm'], (value) =>
		{
			this._Name = value;
		});

		deserialize.number(json['fr'], 60, (value) =>
		{
			this._FrameRate = value;
		});

		deserialize.number(json['w'], (value) =>
		{
			this._Width = value;
		});

		deserialize.number(json['h'], (value) =>
		{
			this._Height = value;
		});

		deserialize.number(json['ip'], (value) =>
		{
			this._InPoint = value;
		});

		deserialize.number(json['op'], (value) =>
		{
			this._OutPoint = value;
		});

		const layerTypes = {
			0: PrecompLayer,
			1: SolidLayer,
            2: ImageLayer,
			3: Layer,
			4: ShapeLayer,
		};

		deserialize.typesList(json['layers'].reverse(), layerTypes, (value) =>
		{
			this._Layers = value;
		});

		//TODO: deserialize
		this._Assets = json['assets']

		// console.log('composition', this);
		return true;
	}

	get layers() {
		return this._Layers
	}

	get width() {
		return this._Width
	}

	get height() {
		return this._Height
	}

	get frameRate() {
		return this._FrameRate
	}

	get inPoint() {
		return this._InPoint
	}

	get startPoint() {
		return this._InPoint
	}

	get outPoint() {
		return this._OutPoint
	}

	get assets() {
		return this._Assets
	}
}