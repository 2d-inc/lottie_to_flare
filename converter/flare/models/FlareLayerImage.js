import FlareLayerContent from './FlareLayerContent';
import FlareImageMeshPoint from './image/FlareImageMeshPoint.js';
import FlareImageDeformPoint from './image/FlareImageDeformPoint.js';
import nodeId from '../../helpers/nodeId';
import {visibilityModes} from '../helpers/visibilityModes.js';

export default class FlareLayerImage extends FlareLayerContent {

	constructor(lottieLayer, isHidden, offsetTime) {
		super(lottieLayer, isHidden, offsetTime)
		const layer = this.lottieLayer
		const assetData = layer.assetData
		const assetWidth = assetData.w
		const assetHeight = assetData.h
		const imageMeshPoint1 = new FlareImageMeshPoint(-assetWidth / 2, -assetHeight / 2, 0, 0)
		const imageMeshPoint2 = new FlareImageMeshPoint(assetWidth / 2, -assetHeight / 2, assetWidth, 0)
		const imageMeshPoint3 = new FlareImageMeshPoint(assetWidth / 2, assetHeight / 2, assetWidth, assetHeight)
		const imageMeshPoint4 = new FlareImageMeshPoint(-assetWidth / 2, assetHeight / 2, 0, assetHeight)
		imageMeshPoint1.contour = imageMeshPoint2.id;
		imageMeshPoint2.contour = imageMeshPoint3.id;
		imageMeshPoint3.contour = imageMeshPoint4.id;
		imageMeshPoint4.contour = imageMeshPoint1.id;
		const imageDeformPoint1 = new FlareImageDeformPoint(-assetWidth / 2, -assetHeight / 2, 0, 0)
		const imageDeformPoint2 = new FlareImageDeformPoint(assetWidth / 2, -assetHeight / 2, assetWidth, 0)
		const imageDeformPoint3 = new FlareImageDeformPoint(assetWidth / 2, assetHeight / 2, assetWidth, assetHeight)
		const imageDeformPoint4 = new FlareImageDeformPoint(-assetWidth / 2, assetHeight / 2, 0, assetHeight)
		this.addChild(imageMeshPoint1)
		this.addChild(imageMeshPoint2)
		this.addChild(imageMeshPoint3)
		this.addChild(imageMeshPoint4)
		this.addChild(imageDeformPoint1)
		this.addChild(imageDeformPoint2)
		this.addChild(imageDeformPoint3)
		this.addChild(imageDeformPoint4)
	}

	convert(animations, offsetTime) {
		const layer = this.lottieLayer

		const assetData = layer.assetData
		const assetWidth = assetData.w
		const assetHeight = assetData.h

		return {
			...super.convert(animations, offsetTime),
			name: "Image",
			asset: assetData.id,
			
			// Flare can use this as a hint to find an
			// existing asset that's already loaded
			// (in case the images are imported separately)
			assetPath: assetData.u + assetData.p,

			translation: [assetWidth / 2, assetHeight / 2],
			"tris": [
				3,
				0,
				1,
				1,
				2,
				3
			],
		}
	}
}