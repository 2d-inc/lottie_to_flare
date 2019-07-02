import deserialize from "../deserialize.js";
import Shape from "./shape.js";
import Fill from "./fill.js";
import Transform from "./transform.js";

export default class Group
{
    constructor()
    {
        this._Name = null;
        this._Items = null;
    }

    deserialize(json)
    {
        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });

        const itemTypes = {
            'sh': Shape,
            'gr': Group,
            'fl': Fill,
            'tr': Transform
        };
        
        deserialize.typesList(json['it'], itemTypes, (value) =>
        {
            this._Items = value;
        });

        console.log('group', this);
        return true;
    }
}