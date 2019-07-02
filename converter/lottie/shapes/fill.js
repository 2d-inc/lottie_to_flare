import deserialize from "../deserialize.js";

export default class Fill
{
    constructor()
    {
        this._Name = null;
    }

    deserialize(json)
    {
        deserialize.string(json['nm'], (value) =>
        {
            this._Name = value;
        });
        
        return true;
    }
}