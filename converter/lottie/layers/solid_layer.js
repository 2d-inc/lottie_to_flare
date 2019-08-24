import deserialize from "../deserialize.js";
import Layer from "./layer.js";

import hexToColor from '../../helpers/hexToColor.js'

export default class SolidLayer extends Layer
{
    constructor()
    {
        super();
        this._Width = 0;
        this._Height = 0;
        this._Color = null;
    }

    deserialize(json)
    {
        if (!super.deserialize(json))
        {
            return false;
        }

        deserialize.number(json['sw'], (value) =>
        {
            this._Width = value;
        });

        deserialize.number(json['sh'], (value) =>
        {
            this._Height = value;
        });

        deserialize.string(json['sc'], (value) =>
        {
            this._Color = hexToColor(value);
        });

        return true;
    }

    get width() {
        return this._Width
    }

    get height() {
        return this._Height
    }

    get color() {
        return this._Color
    }
}