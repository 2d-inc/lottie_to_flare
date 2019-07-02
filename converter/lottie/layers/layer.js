import deserialize from "../deserialize.js";

export default class Layer
{
	constructor()
	{
		this._Name = null;
		this._InPoint = null;
		this._OutPoint = null;
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

		console.log('layer', this);
		return true;
	}
}