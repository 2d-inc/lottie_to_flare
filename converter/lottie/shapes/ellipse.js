import deserialize from "../deserialize.js";
import shapeTypes from './shapeTypes';
import AnimatableProperty from "../properties/animatable_property.js";
import PrimitiveType from "../properties/primitiveType.js";

export default class Ellipse
{
	constructor()
	{
        this._Name = null;
        this._Position = null;
        this._Size = null;
        this._Roundness = 0;
        this._Type = shapeTypes.ELLIPSE;
	}

	deserialize(json)
	{
		deserialize.string(json['nm'], (value) =>
		{
			this._Name = value;
		});

        AnimatableProperty.deserializeType(json['p'], PrimitiveType, (value) =>
        {
            this._Position = value;
        });

        AnimatableProperty.deserializeType(json['s'], PrimitiveType, (value) =>
        {
            this._Size = value;
        });

		return true;
	}

    get position() {
        return this._Position
    }

    get size() {
        return this._Size
    }

    get type() {
        return this._Type
    }
}