import deserialize from "../deserialize.js";
import Layer from "./layer.js";
import Path from "../shapes/path.js";
import Group from "../shapes/group.js";
import Fill from "../shapes/fill.js";
import Rectangle from "../shapes/rectangle.js";

export default class ShapeLayer extends Layer
{
    constructor()
    {
        super();
        this._Items = null;
    }

    deserialize(json)
    {
        if (!super.deserialize(json))
        {
            return false;
        }

        const shapeTypes = {
            'sh': Path,
            'gr': Group,
            'fl': Fill,
            'rc': Rectangle,
        };
        deserialize.typesList(json['shapes'], shapeTypes, (value) =>
        {
            this._Items = value;
        });

        return true;
    }

    get items() {
        return this._Items
    }
}