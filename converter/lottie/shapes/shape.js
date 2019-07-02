import deserialize from "../deserialize.js";
import AnimatableProperty from "../properties/animatable_property.js";
import ShapeVertices from "../properties/shape_vertices.js";

export default class Shape
{
	constructor()
	{
        this._Name = null;
        this._Vertices = null;
	}

	deserialize(json)
	{
		deserialize.string(json['nm'], (value) =>
		{
			this._Name = value;
		});

		AnimatableProperty.deserializeType(json['ks'], ShapeVertices, (value) =>
		{
			this._Vertices = value;
		});

		console.log('shape', this);
		return true;
	}
}