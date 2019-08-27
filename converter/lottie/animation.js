import deserialize from "./deserialize.js";
import PrecompLayer from "./layers/precomp_layer.js";
import ShapeLayer from "./layers/shape_layer.js";
import SolidLayer from "./layers/solid_layer.js";
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
			4: ShapeLayer,
			3: Layer,
		};

		deserialize.typesList(json['layers'], layerTypes, (value) =>
		{
			this._Layers = value;
		}, [json['assets']]);

		// console.log('composition', this);
		return true;
	}

	searchParent(layer, id, layers) {
		if (id) {
			const parentLayer = layers.find(parentLayer => parentLayer.id === id)
			layer.addParent(parentLayer)
			this.searchParent(layer, parentLayer.parentId, layers)
		}
	}

	buildParenting() {
		const layers = this._Layers
		layers.forEach(layer => {
			this.searchParent(layer, layer.parentId, layers)
		})
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
}