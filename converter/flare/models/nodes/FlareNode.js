import nodeId from '../../../helpers/nodeId';

export default class FlareNode {

	constructor(name = 'NodeName', children = [], type = 'node', transform = {}, opacity = 1) {

		this._Id = nodeId();
		if (!Array.isArray(children) && children) {
			children = [children]
		}
		this._Children = children;
		this._Transform = transform;
		this._Opacity = opacity;
		this._Name = name || 'NodeName';
		this._Type = type;
		this._Clips = null;
	}

	addChildren(children) {
		this._Children = this._Children.concat(children)
	}

	addChild(child) {
		if (!Array.isArray(child) && child) {
			child = [child]
		}
		this.addChildren(child)
	}

	addChildToLastLeave(child) {
		if (this._Children.length) {
			this._Children.forEach(child => child.addChildToLastLeave(child))
		} else {
			this.addChild(child)
		}
	}

	convertChild(child, animations, offsetTime) {
		return child.convert(animations, offsetTime)
	}

	convertChildren(animations, offsetTime) {
		if (this._Children) {
			return this._Children.map(child => this.convertChild(child, animations, offsetTime))
			.reduce((accumulator, child) => {
				if (Array.isArray(child)) {
					return [...accumulator, ...child]
				} else {
					return [...accumulator, child]
				}
			}, [])
		}
		return null
	}

	convert(animations, offsetTime) {

		return {
			type: this._Type,
			id: this.id,
			name: this._Name,
			// ...this._Transform.convert(animations, offsetTime),
			opacity: this._Opacity,
			displayType: "empty",
			children: this.convertChildren(animations, offsetTime),
			clips: this._Clips,
		}
	}

	get id() {
		return this._Id;
	}

	get name() {
		return this._Name;
	}

	set name(value) {
		this._Name = value;
	}

	get type() {
		return this._Type;
	}

	set type(value) {
		this._Type = value;
	}

	set transform(value) {
		this._Transform = value;
	}

	set opacity(value) {
		this._Opacity = value;
	}

	set clips(value) {
		this._Clips = value;
	}
}