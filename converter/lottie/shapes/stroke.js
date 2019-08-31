import deserialize from "../deserialize.js";
import getPropertyFirstValue from "../../helpers/getPropertyFirstValue.js";
import shapeTypes from './shapeTypes';
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex';

export default class Stroke
{
    constructor()
    {
        this._Name = null;
        this._Color = [0, 0, 0];
        this._Opacity = 0;
        this._Width = 0;
        this._LineCap = 0;
        this._LineJoin = 0;
        this._Type = shapeTypes.STROKE;
        this._DrawOrder = getDrawOrderIndex();
    }

    deserialize(json)
    {
        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });

        this._Color = getPropertyFirstValue(json['c'])

        deserialize.number(getPropertyFirstValue(json['o']), (value) =>
        {
            this._Opacity = value / 100;
        });

        deserialize.number(getPropertyFirstValue(json['w']), (value) =>
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