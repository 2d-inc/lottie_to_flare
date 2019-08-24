import artboard from './artboard.js'
import nodeId from '../helpers/nodeId'

const convert = async(animation) => {

	const board = await artboard(animation)

	return {
		artboards: {
			type: "artboards",
			id: nodeId(),
			name: "Artboards",
			main: 0,
			children: [board]
		},
		assets: [],
		settings: {},
	}
}

export default convert