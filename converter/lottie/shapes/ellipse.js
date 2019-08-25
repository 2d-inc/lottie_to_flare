import deserialize from "../deserialize.js";
import shapeTypes from './shapeTypes';
import { vec2 } from "gl-matrix";
import getPropertyFirstValue from "../../helpers/getPropertyFirstValue.js";

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

		this._Position = getPropertyFirstValue(json['p']);

		this._Size = getPropertyFirstValue(json['s']);

		console.log(json)

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