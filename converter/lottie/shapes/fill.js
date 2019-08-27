import deserialize from "../deserialize.js";
import getPropertyFirstValue from "../../helpers/getPropertyFirstValue.js";
import shapeTypes from './shapeTypes';
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex';

export default class Fill
{
    constructor()
    {
        this._Name = null;
        this._Color = [0, 0, 0];
        this._Opacity = 0;
        this._Type = shapeTypes.FILL;
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