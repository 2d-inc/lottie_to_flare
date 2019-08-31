import deserialize from "../deserialize.js";
import shapeTypes from './shapeTypes';
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex';
import AnimatableProperty from "../properties/animatable_property.js";
import PrimitiveType from "../properties/primitiveType.js";

export default class Fill
{
    constructor()
    {
        this._Name = null;
        this._Color = null;
        this._Opacity = null;
        this._Type = shapeTypes.FILL;
        this._DrawOrder = getDrawOrderIndex();
    }

    deserialize(json)
    {
        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });

        AnimatableProperty.deserializeType(json['o'], PrimitiveType, (value) =>
        {
            this._Opacity = value;
        });

        AnimatableProperty.deserializeType(json['c'], PrimitiveType, (value) =>
        {
            this._Color = value;
        });
        
        return true;
    }

    get type() {
        return this._Type
    }

    get color() {
        return this._Color
    }

    get opacity() {
        return this._Opacity
    }

    get drawOrder() {
        return this._DrawOrder
    }
}