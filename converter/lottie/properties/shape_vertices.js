import deserialize from "../deserialize.js";
import ShapeVertex from "./shape_vertex.js";

export default class ShapeVertices
{
    constructor()
    {
        this._IsClosed = false;
        this._Vertices = null;
    }

    deserialize(json)
    {
        if (!(json instanceof Object))
        {
            return false;
        }
        this._IsClosed = json['c'] === true;

        const inValues = json['i'];
        const outValues = json['o'];
        const positionValues = json['v'];

        if (!(positionValues instanceof Array))
        {
            return false;
        }

        // In and Out values must be same length as position.
        if (inValues instanceof Array && inValues.length !== positionValues.length)
        {
            inValues = null;
        }
        if (outValues instanceof Array && outValues.length !== positionValues.length)
        {
            outValues = null;
        }

        const vertices = [];
        for (let i = 0, l = positionValues.length; i < l; i++)
        {
            const value = positionValues[i];

            const vertex = new ShapeVertex();

            if (inValues)
            {
                const inValue = inValues[i];
                vertex.in[0] = inValue[0] || 0;
                vertex.in[1] = inValue[1] || 0;
            }

            vertex.position[0] = value[0] || 0;
            vertex.position[1] = value[1] || 0;

            if (outValues)
            {
                const outValue = outValues[i];
                vertex.out[0] = outValue[0] || 0;
                vertex.out[1] = outValue[1] || 0;
            }

            vertices.push(vertex);
        }

        this._Vertices = vertices;

        return true;
    }

    get closed() {
        return this._IsClosed
    }

    get vertices() {
        return this._Vertices
    }

    get value() {
        return this
    }
}