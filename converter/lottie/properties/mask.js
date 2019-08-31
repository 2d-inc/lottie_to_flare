import deserialize from "../deserialize.js";
import AnimatableProperty from "./animatable_property.js";
import ShapeVertices from "./shape_vertices.js";
import shapeTypes from '../shapes/shapeTypes';

export default class Mask
{
    constructor()
    {
        this._Vertices = null
        this._Type = shapeTypes.PATH
    }

    deserialize(json) {

        AnimatableProperty.deserializeType(json['pt'], ShapeVertices, (value) =>
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