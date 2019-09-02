import deserialize from "../deserialize.js";
import Path from "./path.js";
import Fill from "./fill.js";
import GradientFill from "./gradientFill.js";
import GradientStroke from "./gradientStroke.js";
import Stroke from "./stroke.js";
import Transform from "../properties/transform.js";
import shapeTypes from './shapeTypes';
import Rectangle from "../shapes/rectangle.js";
import Ellipse from "../shapes/ellipse.js";
import TrimPath from "../shapes/trimPath.js";

export default class Group
{
    constructor()
    {
        this._Name = null;
        this._Items = null;
        this._Type = shapeTypes.GROUP;
    }

    deserialize(json)
    {
        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });

        const itemTypes = {
            'sh': Path,
            'gr': Group,
            'fl': Fill,
            'gf': GradientFill,
            'gs': GradientStroke,
            'st': Stroke,
            'tr': Transform,
            'rc': Rectangle,
            'el': Ellipse,
            'tm': TrimPath,
        };
        
        deserialize.typesList(json['it'].reverse(), itemTypes, (value) =>
        {
            this._Items = value;
        });

        // console.log('group', this);
        return true;
    }

    get items() {
        return this._Items
    }

    get type() {
        return this._Type
    }
}