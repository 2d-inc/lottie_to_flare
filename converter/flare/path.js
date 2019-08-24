import nodeId from '../helpers/nodeId'
import toArray from '../helpers/toArray'

const buildVertices = (vertices) => {
	return vertices.map(vertex => {
		
		const translation = toArray(vertex.position);
		const inPoints = toArray(vertex.in).map((value, index)=> value + translation[index]);
		const outPoints = toArray(vertex.out).map((value, index)=> value + translation[index]);

		return {
			type: "point",
			id: nodeId(),
			name: "Path Point",
			translation,
			in: inPoints,
			out: outPoints,
			pointType: "D",
			radius: 0,
			weights: [],
		}
	})
}

const path = (shapeVertices) => {


	return {
		type: "path",
		id: nodeId(),
        name: "Path",
        isClosed: shapeVertices.closed,
        children: buildVertices(shapeVertices.vertices),
	}
}

export default path

