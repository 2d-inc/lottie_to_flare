const assets = (assetsList) => {

	return assetsList
	.filter(asset => !!asset.p)
	.map((asset) => ({
		name: asset.id,
		id: asset.id,
		type: 'image/png',
		showBorder: true,
		isFilteringEnabled: true,
	}))
}

export default assets