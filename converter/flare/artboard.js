import FlareArtboard from './models/FlareArtboard'

const artboard = async (composition) => {

	const artboard = new FlareArtboard(composition)
	return artboard.convert()
}

export default artboard