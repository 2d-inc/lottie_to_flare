import Animation from "./lottie/animation.js";
import convert from './flare/converter.js';
import {resetDrawOrderIndex} from './helpers/drawOrderIndex';

export default class LottieToFlare
{
    constructor(options)
    {

    }

    completeLayer(layer, assets) {
        if (!layer.refId) {
            return layer
        } else {
            if (layer.ty === 0) {
                const layers = JSON.parse(JSON.stringify(assets.find(asset => asset.id === layer.refId).layers))
                .map((layer) => this.completeLayer(layer, assets))
                return {
                    ...layer,
                    refId: void 0,
                    layers
                }
            } else if (layer.ty === 2) {
                const assetData = JSON.parse(JSON.stringify(assets.find(asset => asset.id === layer.refId)))
                return {
                    ...layer,
                    refId: void 0,
                    assetData,
                }
            }
        }
    }

    completeData(composition) {
        const assets = composition.assets
        composition.layers = composition.layers.map((layer) => this.completeLayer(layer, assets))
        return composition
    }

    convert(string)
    {

        return new Promise((resolve, reject) =>
        {
            let json = null;
            try
            {
                json = JSON.parse(string);
            }
            catch(err)
            {
                // console.warn("failed to parse json", err);
                reject();
                return;
            }
            resetDrawOrderIndex();
            const animation = new Animation();


            json = this.completeData(json)

            //
            // TODO: complete assets for precomps and images
            //
            if(animation.deserialize(json))
            {
                resolve(convert(animation))
            }
        });
    }
}