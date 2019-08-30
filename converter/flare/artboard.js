import FlareArtboard from './models/FlareArtboard'
import FlareAnimations from './models/animations/FlareAnimation'

const artboard = async (composition) => {

	const animations = new FlareAnimations(composition)

	const artboard = new FlareArtboard(composition, animations)
	return artboard.convert()
}

export default artboard