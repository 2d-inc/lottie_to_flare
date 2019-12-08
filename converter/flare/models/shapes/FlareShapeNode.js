import FlareNode from '../nodes/FlareNode';
import FlareOuterTransform from '../../models/FlareOuterTransform';
import FlareAnchorTransform from '../../models/FlareAnchorTransform';
import FlareOpacity from '../../models/FlareOpacity';
import ShapePaths from './ShapePaths';

export default class FlareShapeNode {

	constructor(transforms) {
		const groupNode = new FlareNode('Group Path', [], 'node')
		this._Transforms = transforms
		this._Paths = new ShapePaths()
		groupNode.addChild(this._Paths)
		this._OuterNode = groupNode
		this.wrapLayer()
	}

	wrapLayer() {
		for (let i = this._Transforms.length - 1; i >= 0 ; i -= 1) {
			const transform = this._Transforms [i]
			const opacityNode = new FlareOpacity(transform, 'Shape')
			const anchorNode = new FlareAnchorTransform(transform, 'Shape')
			const outerTransformNode = new FlareOuterTransform(transform, 'Shape')
			if (opacityNode.hasOpacity()) {
				opacityNode.addChild(this._OuterNode)
				this._OuterNode = opacityNode
			}
			if (anchorNode.hasTransformationApplied()) {
				anchorNode.addChild(this._OuterNode)
				this._OuterNode = anchorNode 
			}
			if (outerTransformNode.hasTransformationApplied()) {
				outerTransformNode.addChild(this._OuterNode)
				this._OuterNode = outerTransformNode
			}
		}
	}
	
	addPath(path) {
		this._Paths.addPath(path)
	}

	convert(animations, offsetTime) {
		return this._OuterNode.convert(animations, offsetTime)
	}

	get transforms() {
		return this._Transforms;
	}
}