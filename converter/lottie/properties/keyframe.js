import deserialize from "../deserialize.js";
import { vec2 } from "gl-matrix";

export default class Keyframe
{
    constructor()
    {
        this._In = [vec2.fromValues(0, 0), vec2.fromValues(0, 0)];
        this._Out = [vec2.fromValues(1, 1), vec2.fromValues(1, 1)];
        this._Time = 0;
        this._Property = null;
        this._InterpolationType = null;
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

    setEasingValues(controls, ease) {
        // console.log(ease)
        if (Array.isArray(ease.x)) {
            controls[0][0] = ease.x[0]
            controls[0][1] = ease.y[0]
            controls[1][0] = ease.x[1]
            controls[1][1] = ease.y[1]
        } else if(ease.x) {
            controls[0][0] = ease.x
            controls[0][1] = ease.y
            controls[1][0] = ease.x
            controls[1][1] = ease.y
        }
    }

    deserialize(prevJson, json, type)
    {
        const inValue = json['i'];
        if (inValue instanceof Object)
        {
            this.setEasingValues(this._In, inValue)
        }

        const outValue = json['o'];
        if (outValue instanceof Object)
        {
            this.setEasingValues(this._Out, outValue)
        }

        deserialize.number(json['t'], (value) =>
        {
            this._Time = value;
        });

        deserialize.number(json['h'], (value) => {

            this._InterpolationType = value === null ? 2 : 0;
        })

        const s = json['s'] || prevJson['e'];
        if (s)
        {
            let value = new type();
            if (value.deserialize(s))
            {
                this._Property = value;
            }
            else if (s instanceof Array && s.length === 1)
            {
                // case where 0th index of array is the value
                let value = new type();
                if (value.deserialize(s[0]))
                {
                    this._Property = value;
                }
            }
        }
        return true;
    }

    get value() {
        return this._Property.value
    }

    get time() {
        return this._Time
    }

    get in() {
        return this._In
    }

    get out() {
        return this._Out
    }

    get interpolation() {
        return this._InterpolationType
    }
}