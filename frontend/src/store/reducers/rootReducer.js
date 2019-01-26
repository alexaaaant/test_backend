import {GET_NODES,GET_NODE_CHILD} from "../../const"

const initialState = ({
	nodes: []
})

export function reduce(state = initialState, action) {
	switch (action.type) {
		case GET_NODES:
			return {...state, nodes:action.payload}
		case GET_NODE_CHILD:
			const steps = wayToChildObj(Object.keys(action.payload)[0])
			const copyNodes = JSON.parse(JSON.stringify(state.nodes))
			setValue(steps, action.payload, copyNodes)
			return {...state, nodes: copyNodes}
		default:
			return state
	}
}

const wayToChildObj = (way) => {
	let steps = []
	let string = ''
	for (let i = 0; i < way.length-2;i++) {
		if(way[i] !== '.') {
			string = string + way[i]
			steps.push(string)
		} else {
			string = string + way[i]
		}
	}
	steps.push('child_nodes')
	return steps
}

const setValue = (propertyPath, value, obj) => {
	if (propertyPath.length > 1) {
		if (!obj.hasOwnProperty(propertyPath[0]) || typeof obj[propertyPath[0]] !== "object") obj[propertyPath[0]] = {}
		return setValue(propertyPath.slice(1), value, obj[propertyPath[0]])
	} else {
		obj[propertyPath[0]] = value
		return obj
	}
}




