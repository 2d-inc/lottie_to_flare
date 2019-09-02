import deserialize from "../deserialize.js";
import AnimatableProperty from "./animatable_property.js";
import PrimitiveType from "./primitiveType.js";

export default class GradientStops
{
    constructor()
    {
        this._Stops = 0;
        this._Color = null;
    }

    deserialize(json) {

        deserialize.number(json['p'], (value) =>
        {
            this._Stops = value;
        });

        AnimatableProperty.deserializeType(json['k'], PrimitiveType, (value) =>
        {
            this._Color = value;
        });

        return true;
    }

    get stops() {
        return this._Stops
    }

    get color() {
        return this._Color
    }
}