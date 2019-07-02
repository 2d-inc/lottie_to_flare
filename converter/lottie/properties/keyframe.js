import deserialize from "../deserialize.js";
import { vec2 } from "gl-matrix";

export default class Keyframe
{
    constructor()
    {
        this._In = vec2.fromValues(0, 0);
        this._Out = vec2.fromValues(1, 1);
        this._Time = 0;
        this._Value = null;
    }

    static deserializeType(prevJson, json, type, cb)
    {
        if (!(json instanceof Object))
        {
            return cb(null);
        }

        const keyframe = new Keyframe();
        if (keyframe.deserialize(prevJson, json, type))
        {
            return cb(keyframe);
        }

        return cb(null);
    }

    deserialize(prevJson, json, type)
    {
        const inValue = json['i'];
        if (inValue instanceof Object)
        {
            this._In[0] = inValue.x || 0;
            this._In[1] = inValue.y || 0;
        }

        const outValue = json['o'];
        if (outValue instanceof Object)
        {
            this._Out[0] = outValue.x || 0;
            this._Out[1] = outValue.y || 0;
        }

        deserialize.number(json['t'], (value) =>
        {
            this._Time = value;
        });

        const s = json['s'];
        if (s)
        {
            let value = new type();
            if (value.deserialize(s))
            {
                this._Value = value;
            }
            else if (s instanceof Array && s.length === 1)
            {
                // case where 0th index of array is the value
                let value = new type();
                if (value.deserialize(s[0]))
                {
                    this._Value = value;
                }
            }
        }
        return true;
    }
}