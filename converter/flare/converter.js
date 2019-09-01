import artboard from './artboard.js'
import assets from './assets.js'
import nodeId from '../helpers/nodeId'

const convert = async(animation) => {

	const board = await artboard(animation)
	const assetsArray = assets(animation.assets)

	return {
		artboards: {
			type: "artboards",
			id: nodeId(),
			name: "Artboards",
			main: 0,
			children: [board]
		},
		assets: assetsArray,
		settings: {},
	}
}

export default convert