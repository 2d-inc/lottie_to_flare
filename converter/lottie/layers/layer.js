import deserialize from "../deserialize.js";
import Transform from "../properties/transform.js";

export default class Layer
{
	constructor()
	{
		this._Type = null;
		this._Name = null;
		this._InPoint = null;
		this._OutPoint = null;
		this._Parent = null;
		this._BlendMode = null;
		this._Transform = null;
	}

	deserialize(json)
	{
		deserialize.string(json['nm'], (value) =>
		{
			this._Name = value;
		});

		deserialize.number(json['ip'], (value) =>
		{
			this._InPoint = value;
		});

		deserialize.number(json['op'], (value) =>
		{
			this._OutPoint = value;
		});

		deserialize.number(json['parent'] || 0, (value) =>
		{
			this._Parent = value;
		});

		deserialize.number(json['bm'], (value) =>
		{
			this._BlendMode = value;
		});

		deserialize.number(json['ty'], (value) =>
		{
			this._Type = value;
		});

		deserialize.type(json['ks'], Transform, (value) =>
		{
			this._Transform = value;
		});

		// console.log('layer', this);
		return true;
	}

	get type() {
		return this._Type
	}

	get transform() {
		return this._Transform
	}
}