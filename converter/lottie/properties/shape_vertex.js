import { vec2 } from "gl-matrix";

export default class ShapeVertex
{
    constructor()
    {
        this.in = vec2.fromValues(0, 0);
        this.out = vec2.fromValues(1, 1);
        this.position = vec2.fromValues(0, 0);
    }
}