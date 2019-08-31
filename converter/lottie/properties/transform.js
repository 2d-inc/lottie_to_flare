import deserialize from "../deserialize.js";
import AnimatableProperty from "./animatable_property.js";
import PrimitiveType from "./primitiveType.js";
import { vec2 } from "gl-matrix";

export default class Transform
{
    constructor()
    {
        this._AnchorPoint = vec2.fromValues(0, 0);
        this._Position = vec2.fromValues(0, 0);
        this._Scale = vec2.fromValues(0, 0);
        this._Rotation = 0;
        this._Opacity = 0;
        this._Type = 'transform'
    }

    deserialize(json) {

        AnimatableProperty.deserializeType(json['r'], PrimitiveType, (value) =>
        {
            this._Rotation = value;
        });

        AnimatableProperty.deserializeType(json['o'], PrimitiveType, (value) =>
        {
            this._Opacity = value;
        });

        AnimatableProperty.deserializeType(json['p'], PrimitiveType, (value) =>
        {
            this._Position = value;
        });

        AnimatableProperty.deserializeType(json['a'], PrimitiveType, (value) =>
        {
            this._AnchorPoint = value;
        });

        AnimatableProperty.deserializeType(json['s'], PrimitiveType, (value) =>
        {
            this._Scale = value;
        });

        return true;
    }

    get position() {
        return this._Position
    }

    get position2() {
        return this._Position
    }

    get anchorPoint() {
        return this._AnchorPoint
    }

    get scale() {
        return this._Scale
    }

    get rotation() {
        return this._Rotation
    }

    get opacity() {
        return this._Opacity
    }

    get type() {
        return this._Type
    }
}