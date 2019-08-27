import Animation from "./lottie/animation.js";
import convert from './flare/converter.js'

export default class LottieToFlare
{
    constructor(options)
    {

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
                console.warn("failed to parse json", err);
                reject();
                return;
            }
            const animation = new Animation();
            //
            // TODO: complete assets for precomps and images
            //
            if(animation.deserialize(json))
            {
                animation.buildParenting()
                resolve(convert(animation))
            }

            resolve({
                "artboards": {
                    "type": "artboards",
                    "id": 985,
                    "name": "Artboards",
                    "main": 0,
                    "children": [
                        {
                            "type": "artboard",
                            "id": 986,
                            "name": "Artboard",
                            "translation": [
                                0,
                                0
                            ],
                            "origin": [
                                0,
                                0
                            ],
                            "width": 1024,
                            "height": 768,
                            "color": [
                                0.364705890417099,
                                0.364705890417099,
                                0.364705890417099,
                                1
                            ],
                            "clipContents": true,
                            "animations": [],
                            "children": [
                                {
                                    "type": "shape",
                                    "id": 996,
                                    "name": "Rectangle",
                                    "translation": [
                                        479.5,
                                        407.5
                                    ],
                                    "blendMode": "srcOver",
                                    "drawOrder": 3,
                                    "clips": [
                                        1000
                                    ],
                                    "children": [
                                        {
                                            "type": "colorStroke",
                                            "id": 997,
                                            "name": "Color",
                                            "opacity": 1,
                                            "color": [
                                                0.800000011920929,
                                                0.800000011920929,
                                                0.800000011920929,
                                                1
                                            ],
                                            "width": 1,
                                            "cap": "butt",
                                            "join": "miter",
                                            "trim": "off",
                                            "trimStart": 0,
                                            "trimEnd": 1,
                                            "trimOffset": 0
                                        },
                                        {
                                            "type": "colorFill",
                                            "id": 998,
                                            "name": "Color",
                                            "opacity": 1,
                                            "color": [
                                                1,
                                                0,
                                                0,
                                                1
                                            ],
                                            "fillRule": "nonzero"
                                        },
                                        {
                                            "type": "rectangle",
                                            "id": 999,
                                            "name": "Rectangle Path",
                                            "width": 257,
                                            "height": 257,
                                            "cornerRadius": 0
                                        }
                                    ]
                                },
                                {
                                    "type": "solo",
                                    "id": 1000,
                                    "name": "Solo Group",
                                    "translation": [
                                        596.5,
                                        295.5
                                    ],
                                    "activeChildIndex": 0,
                                    "children": [
                                        {
                                            "type": "shape",
                                            "id": 987,
                                            "name": "Ellipse",
                                            "translation": [
                                                -160.5,
                                                14.5
                                            ],
                                            "blendMode": "srcOver",
                                            "drawOrder": 1,
                                            "children": [
                                                {
                                                    "type": "colorStroke",
                                                    "id": 988,
                                                    "name": "Color",
                                                    "opacity": 1,
                                                    "color": [
                                                        0.800000011920929,
                                                        0.800000011920929,
                                                        0.800000011920929,
                                                        1
                                                    ],
                                                    "width": 1,
                                                    "cap": "butt",
                                                    "join": "miter",
                                                    "trim": "off",
                                                    "trimStart": 0,
                                                    "trimEnd": 1,
                                                    "trimOffset": 0
                                                },
                                                {
                                                    "type": "colorFill",
                                                    "id": 989,
                                                    "name": "Color",
                                                    "opacity": 1,
                                                    "color": [
                                                        0.4000000059604645,
                                                        0.4000000059604645,
                                                        0.4000000059604645,
                                                        1
                                                    ],
                                                    "fillRule": "nonzero"
                                                },
                                                {
                                                    "type": "ellipse",
                                                    "id": 990,
                                                    "name": "Ellipse Path",
                                                    "width": 232,
                                                    "height": 232
                                                }
                                            ]
                                        },
                                        {
                                            "type": "shape",
                                            "id": 991,
                                            "name": "Triangle",
                                            "translation": [
                                                160.5,
                                                -14.5
                                            ],
                                            "blendMode": "srcOver",
                                            "drawOrder": 2,
                                            "children": [
                                                {
                                                    "type": "colorStroke",
                                                    "id": 992,
                                                    "name": "Color",
                                                    "opacity": 1,
                                                    "color": [
                                                        0.800000011920929,
                                                        0.800000011920929,
                                                        0.800000011920929,
                                                        1
                                                    ],
                                                    "width": 1,
                                                    "cap": "butt",
                                                    "join": "miter",
                                                    "trim": "off",
                                                    "trimStart": 0,
                                                    "trimEnd": 1,
                                                    "trimOffset": 0
                                                },
                                                {
                                                    "type": "colorFill",
                                                    "id": 993,
                                                    "name": "Color",
                                                    "opacity": 1,
                                                    "color": [
                                                        0.4000000059604645,
                                                        0.4000000059604645,
                                                        0.4000000059604645,
                                                        1
                                                    ],
                                                    "fillRule": "nonzero"
                                                },
                                                {
                                                    "type": "triangle",
                                                    "id": 994,
                                                    "name": "Triangle Path",
                                                    "width": 304,
                                                    "height": 278
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "assets": [],
                "settings": {}
            });
        });
    }
}