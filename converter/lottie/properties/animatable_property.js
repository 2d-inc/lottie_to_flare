import deserialize from "../deserialize.js";
import Keyframe from "./keyframe.js";

export default class AnimatableProperty
{
    constructor()
    {
        this._IsAnimated = false;
        this._Property = null;
        this._KeyFrames = null;
    }

    static deserializeType(value, type, cb)
    {
        if (!(value instanceof Object))
        {
            return cb(null);
        }

        const animatableProperty = new AnimatableProperty();
        if (animatableProperty.deserialize(value, type))
        {
            return cb(animatableProperty);
        }

        return cb(null);
    }

    deserialize(value, type)
    {
        let isAnimated
        if ('a' in value) {
            isAnimated = value['a'] ? true : false;
        } else {
            if ('k' in value 
                && Array.isArray(value.k) 
                && typeof value.k[0] === 'object' 
                && 's' in value.k[0]) 
            {
                isAnimated = true;
            }
        }

        this._IsAnimated = isAnimated;

        const k = value['k'];

        if (isAnimated && k instanceof Array)
        {
            // Animated flag was up and the key property is a list
            const keyFrames = [];
            let lastKeyFrameJson = null;
            for (const keyFrameJson of k)
            {
                if (!(keyFrameJson instanceof Object))
                {
                    continue;
                }
                Keyframe.deserializeType(lastKeyFrameJson, keyFrameJson, type, (keyframe) =>
                {
                    if (keyframe)
                    {
                        keyFrames.push(keyframe);
                    }
                });

                lastKeyFrameJson = keyFrameJson
            }

            this._KeyFrames = keyFrames;

            return true;
        }
        else if (!isAnimated)
        {
            // Animated flag was down and the key property is an object
            const value = new type();
            if (value.deserialize(k))
            {
                this._Property = value;
            }
            return true;
        }

        return false;
    }

    get animated() {
        return this._IsAnimated;
    }

    get animatable() {
        return true;
    }

    get value() {
        return this._Property.value;
    }

    get keyframes() {
        return this._KeyFrames;
    }

    get firstValue() {
        return this.animated ? this._KeyFrames[0].value :  this.value;
    }

    getValueIfNotDefault(defaultValue) {
        if (this.animated) {
            return this;
        } else {
            const value = this.value;
            if (value.length && value.findIndex(val => val !== defaultValue) === -1) {
                return void 0;
            }
            return this;
        }
    }
}