import deserialize from "../deserialize.js";
import Layer from "./layer.js";
import {getDrawOrderIndex} from '../../helpers/drawOrderIndex';

export default class ImageLayer extends Layer
{
    constructor()
    {
        super();
        this._Width = 0;
        this._Height = 0;
        this._DrawOrder = getDrawOrderIndex();
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

        //TODO: deserialize
        this._AssetData = json['assetData']

        return true;
    }

    get width() {
        return this._Width
    }

    get height() {
        return this._Height
    }

    get drawOrder() {
        return this._DrawOrder
    }

    get assetData() {
        return this._AssetData
    }
}