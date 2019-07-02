import deserialize from "../deserialize.js";
import Layer from "./layer.js";
import Shape from "../shapes/shape.js";
import Group from "../shapes/group.js";
import Fill from "../shapes/fill.js";

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
            'sh': Shape,
            'gr': Group,
            'fl': Fill,
        };
        deserialize.typesList(json['shapes'], shapeTypes, (value) =>
        {
            this._Items = value;
        });

        return true;
    }
}