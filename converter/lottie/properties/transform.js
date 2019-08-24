import deserialize from "../deserialize.js";
import getPropertyFirstValue from "../../helpers/getPropertyFirstValue.js";
import { vec2 } from "gl-matrix";

export default class Transform
{
    constructor()
    {
        this._AnchorPoint = vec2.fromValues(0, 0);
        this._Position = vec2.fromValues(0, 0);
        this._Scale = vec2.fromValues(0, 0);
        this._Rotation = 0;
        this._Opacity = 0;
    }

    deserialize(json) {

    	deserialize.number(getPropertyFirstValue(json['r']), (value) =>
    	{
    	    this._Rotation = value;
    	});

    	deserialize.number(getPropertyFirstValue(json['o']), (value) =>
    	{
    	    this._Opacity = value / 100;
    	});

    	const position = getPropertyFirstValue(json['p'])
    	this._Position[0] = position[0]
    	this._Position[1] = position[1]

    	const anchorPoint = getPropertyFirstValue(json['a'])
    	this._AnchorPoint[0] = anchorPoint[0]
    	this._AnchorPoint[1] = anchorPoint[1]

    	const scale = getPropertyFirstValue(json['s'])
    	this._Scale[0] = scale[0] / 100
    	this._Scale[1] = scale[1] / 100

        return true;
    }

    get position() {
        return this._Position
    }

    get anchorPoint() {
        return this._AnchorPoint
    }

    get scale() {
        return this._Scale
    }

    get rotation() {
        return this._Rotation
    }

    get opacity() {
        return this._Opacity
    }
}