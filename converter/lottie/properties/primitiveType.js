export default class PrimitiveType
{
    constructor()
    {
        this._Value = null;
    }

    deserialize(value)
    {
         this._Value = value;
        

        return true;
    }

    get value() {
        return this._Value
    }
}