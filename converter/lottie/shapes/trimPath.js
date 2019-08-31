import deserialize from "../deserialize.js";
import AnimatableProperty from "../properties/animatable_property.js";
import PrimitiveType from "../properties/primitiveType.js";
import shapeTypes from './shapeTypes';

export default class TrimPath
{
    constructor()
    {
        this._Start = null;
        this._End = null;
        this._Offset = null;
        this._Type = shapeTypes.TRIM_PATH;
    }

    deserialize(json)
    {

        AnimatableProperty.deserializeType(json['e'], PrimitiveType, (value) =>
        {
            this._End = value;
        });

        AnimatableProperty.deserializeType(json['s'], PrimitiveType, (value) =>
        {
            this._Start = value;
        });

        AnimatableProperty.deserializeType(json['o'], PrimitiveType, (value) =>
        {
            this._Offset = value;
        });

        return true;
    }

    get type() {
        return this._Type
    }

    get start() {
        return this._Start
    }

    get end() {
        return this._End
    }

    get offset() {
        return this._Offset
    }
}