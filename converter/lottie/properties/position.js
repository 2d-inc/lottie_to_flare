import deserialize from "../deserialize.js";
import AnimatableProperty from "./animatable_property.js";
import PrimitiveType from "./primitiveType.js";
import { vec2 } from "gl-matrix";

export default class Position
{
    constructor()
    {
        this._Position = null;
        this._X = null;
        this._Y = null;
        this._HasSeparateDimensions = false;
    }

    deserialize(json) {
        deserialize.boolean(json['s'], (value) => {

            this._HasSeparateDimensions = value;
        })

        if (this._HasSeparateDimensions){
            AnimatableProperty.deserializeType(json['x'], PrimitiveType, (value) =>
            {
                this._X = value;
            });
            AnimatableProperty.deserializeType(json['y'], PrimitiveType, (value) =>
            {
                this._Y = value;
            });
        } else {
            AnimatableProperty.deserializeType(json, PrimitiveType, (value) =>
            {
                this._Position = value;
            });
        }

        return true;
    }

    get animated() {
        return this.hasSeparateDimensions 
        ? this._X.animated || this._Y.animated 
        : this._Position.animated;
    }

    get hasSeparateDimensions() {
        return this._HasSeparateDimensions;
    }

    get position() {
        return this._Position;
    }

    get x() {
        return this._X;
    }

    get y() {
        return this._Y;
    }

    get keyframes() {
        return this._Position.keyframes;
    }

    get firstValue() {
        if (this.hasSeparateDimensions) {
            return [this._X.firstValue, this._Y.firstValue]
        } else {
            return this._Position.keyframes[0].value;
        }
    }

    get value() {
        if (this.hasSeparateDimensions) {
            return [this._X.value, this._Y.value];
        } else {
            return this._Position.value;
        }
    }

    getValueIfNotDefault(defaultValue) {
        if (this.animated) {
            return this;
        } else {
            let value;
            if (this.hasSeparateDimensions) {
                if (this._X.value === defaultValue && this._Y.value === defaultValue) {
                    return void 0;
                }
            } else {
                value = this._Position.value;
                if (value.length && value.findIndex(val => val !== defaultValue) === -1) {
                    return void 0;
                }
            }
            return this;
        }
    }
}