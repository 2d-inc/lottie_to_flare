import deserialize from "../deserialize.js";
import Layer from "./layer.js";
import ShapeLayer from "./shape_layer.js";
import SolidLayer from "./solid_layer.js";
import ImageLayer from "./image_layer.js";

export default class PrecompLayer extends Layer
{
    constructor(assets)
    {
        super();
        this._Assets = assets;
        this._Items = null;
    }

    deserialize(json)
    {
        if (!super.deserialize(json))
        {
            return false;
        }

        const layers = json.layers

        const layerTypes = {
            0: PrecompLayer,
            1: SolidLayer,
            2: ImageLayer,
            3: Layer,
            4: ShapeLayer,
        };
        deserialize.typesList(layers.reverse(), layerTypes, (value) =>
        {
            this._Layers = value;
        });

        return true;
    }

    get layers() {
        return this._Layers
    }
}