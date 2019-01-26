import {GET_NODES,GET_NODE_CHILD, CHANGE_HIDE, } from "../../const"
import {wayToChildObj, setValue} from "../../functions/functions"

const initialState = ({
	nodes: [],
})

export function reduce(state = initialState, action) {
	switch (action.type) {
		case GET_NODES:
			return {...state, nodes:action.payload}
		case GET_NODE_CHILD:
			const steps = wayToChildObj(action.payload.route)
			const copyNodes = JSON.parse(JSON.stringify(state.nodes))
			setValue(steps, action.payload.nodeChild, copyNodes)
			return {...state, nodes: copyNodes}
		case CHANGE_HIDE:
			let stepsToHide = wayToChildObj(action.payload.route, true)
			const copyAllNodes = JSON.parse(JSON.stringify(state.nodes))
			setValue(stepsToHide, action.payload.hide, copyAllNodes, true)
			return {...state, nodes: copyAllNodes}
		default:
			return state
	}
}






