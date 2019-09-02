import deserialize from "../deserialize.js";
import shapeTypes from './shapeTypes.js';
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex.js';
import AnimatableProperty from "../properties/animatable_property.js";
import PrimitiveType from "../properties/primitiveType.js";
import GradientStops from '../properties/gradientStops.js';

export default class GradientStroke
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
        this._Width = 0;
        this._LineCap = 0;
        this._LineJoin = 0;
        this._Type = shapeTypes.GRADIENT_STROKE;
        this._DrawOrder = getDrawOrderIndex();
    }

    deserialize(json)
    {

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

        AnimatableProperty.deserializeType(json['w'], PrimitiveType, (value) =>
        {
            this._Width = value;
        });

        deserialize.number(json['lc'], (value) =>
        {
            this._LineCap = value;
        });

        deserialize.number(json['lj'], (value) =>
        {
            this._LineJoin = value;
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

    get width() {
        return this._Width
    }

    get lineCap() {
        return this._LineCap
    }

    get lineJoin() {
        return this._LineCap
    }

    get drawOrder() {
        return this._DrawOrder
    }
}