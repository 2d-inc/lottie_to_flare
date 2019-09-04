import FlareContent from './FlareContent';
import nodeId from '../../helpers/nodeId';

export default class FlareLayerSolid extends FlareContent {

	convertContent() {
		const layer = this.lottieLayer

		const assetData = layer.assetData
		const assetWidth = assetData.w
		const assetHeight = assetData.h

		const verticesIds = [nodeId(), nodeId(), nodeId(), nodeId()]

		return [
			{
				type: "image",
				id: nodeId(),
				name: "Image",
				asset: assetData.id,
				
				// Flare can use this as a hint to find an
				// existing asset that's already loaded
				// (in case the images are imported separately)
				assetPath: assetData.u + assetData.p,

				blendMode: "srcOver",
				drawOrder: layer.drawOrder,
				translation: [assetWidth / 2, assetHeight / 2],
				"tris": [
					3,
					0,
					1,
					1,
					2,
					3
				],
				children: [
					{
						"type": "meshPoint",
						"id": verticesIds[0],
						"name": "Node",
						"translation": [
							-assetWidth / 2,
							-assetHeight / 2
						],
						"uv": [
							0,
							0
						],
						"contour": verticesIds[1],
						"isForced": false
					},
					{
						"type": "meshPoint",
						"id": verticesIds[1],
						"name": "Node",
						"translation": [
							assetWidth / 2,
							-assetHeight / 2
						],
						"uv": [
							assetWidth,
							0
						],
						"contour": verticesIds[2],
						"isForced": false
					},
					{
						"type": "meshPoint",
						"id": verticesIds[2],
						"name": "Node",
						"translation": [
							assetWidth / 2,
							assetHeight / 2
						],
						"uv": [
							assetWidth,
							assetHeight
						],
						"contour": verticesIds[3],
						"isForced": false
					},
					{
						"type": "meshPoint",
						"id": verticesIds[3],
						"name": "Node",
						"translation": [
							-assetWidth / 2,
							assetHeight / 2
						],
						"uv": [
							0,
							assetHeight
						],
						"contour": verticesIds[0],
						"isForced": false
					},
					{
						"type": "meshDeformPoint",
						"id": nodeId(),
						"name": "Node",
						"translation": [
							-assetWidth / 2,
							-assetHeight / 2
						],
						"uv": [
							0,
							0
						],
						"weights": [
							1,
							0,
							0,
							0,
							1,
							0,
							0,
							0
						]
					},
					{
						"type": "meshDeformPoint",
						"id": nodeId(),
						"name": "Node",
						"translation": [
							assetWidth / 2,
							-assetHeight / 2
						],
						"uv": [
							assetWidth,
							0
						],
						"weights": [
							1,
							0,
							0,
							0,
							1,
							0,
							0,
							0
						]
					},
					{
						"type": "meshDeformPoint",
						"id": nodeId(),
						"name": "Node",
						"translation": [
							assetWidth / 2,
							assetHeight / 2
						],
						"uv": [
							assetWidth,
							assetHeight
						],
						"weights": [
							1,
							0,
							0,
							0,
							1,
							0,
							0,
							0
						]
					},
					{
						"type": "meshDeformPoint",
						"id": nodeId(),
						"name": "Node",
						"translation": [
							-assetWidth / 2,
							assetHeight / 2
						],
						"uv": [
							0,
							assetHeight
						],
						"weights": [
							1,
							0,
							0,
							0,
							1,
							0,
							0,
							0
						]
					}
				]
			}
		]

	}
}