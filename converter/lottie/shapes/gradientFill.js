import deserialize from "../deserialize.js";
import shapeTypes from './shapeTypes.js';
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex.js';
import AnimatableProperty from "../properties/animatable_property.js";
import PrimitiveType from "../properties/primitiveType.js";
import GradientStops from '../properties/gradientStops.js';

export default class GradientFill
{
    constructor()
    {
        this._Name = null;
        this._StartPoint = null;
        this._EndPoint = null;
        this._Opacity = null;
        this._Gradient = null;
        this._HighlightLength = null;
        this._GradientType = 1;
        this._Type = shapeTypes.GRADIENT_FILL;
        this._DrawOrder = getDrawOrderIndex();
    }

    deserialize(json)
    {

        console.log(json)

        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });

        deserialize.number(json['t'], (value) =>
        {
            this._GradientType = value;
        });

        AnimatableProperty.deserializeType(json['o'], PrimitiveType, (value) =>
        {
            this._Opacity = value;
        });

        AnimatableProperty.deserializeType(json['s'], PrimitiveType, (value) =>
        {
            this._StartPoint = value;
        });

        AnimatableProperty.deserializeType(json['e'], PrimitiveType, (value) =>
        {
            this._EndPoint = value;
        });

        deserialize.type(json['g'], GradientStops, (value) =>
        {
            this._Gradient = value;
        });

        if (this._GradientType === 2) {
            AnimatableProperty.deserializeType(json['h'], PrimitiveType, (value) =>
            {
                this._HighlightLength = value;
            });
        }

        return true;
    }

    get type() {
        return this._Type
    }

    get gradientType() {
        return this._GradientType
    }

    get color() {
        return this._Gradient
    }

    get opacity() {
        return this._Opacity
    }

    get endPoint() {
        return this._EndPoint
    }

    get startPoint() {
        return this._StartPoint
    }

    get color() {
        return this._Gradient
    }

    get stops() {
        return this._Stops
    }

    get highlightLength() {
        return this._HighlightLength
    }

    get drawOrder() {
        return this._DrawOrder
    }
}