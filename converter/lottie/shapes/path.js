import deserialize from "../deserialize.js";
import AnimatableProperty from "../properties/animatable_property.js";
import ShapeVertices from "../properties/shape_vertices.js";
import shapeTypes from './shapeTypes';
import {getShapePropertyFirstValue} from "../../helpers/getPropertyFirstValue.js";

export default class Path
{
	constructor()
	{
        this._Name = null;
        this._Vertices = null;
        this._Type = shapeTypes.PATH;
	}

	deserialize(json)
	{
		deserialize.string(json['nm'], (value) =>
		{
			this._Name = value;
		});

		/*AnimatableProperty.deserializeType(json['ks'], ShapeVertices, (value) =>
		{
			this._Vertices = value;
		});*/

		deserialize.type(getShapePropertyFirstValue(json['ks']), ShapeVertices, (value) =>
		{
			this._Vertices = value;
		});

		return true;
	}

    get vertices() {
        return this._Vertices
    }

    get type() {
        return this._Type
    }
}