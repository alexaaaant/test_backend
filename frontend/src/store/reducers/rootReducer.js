import {GET_NODES, GET_NODE_CHILD, CHANGE_HIDE, DELETE_NODE, CHANGE_NODE} from "../../const"
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
		case DELETE_NODE:
			let stepsToDelete = wayToChildObj(action.payload, false, true)
			const _copyAllNodes = JSON.parse(JSON.stringify(state.nodes))
			setValue(stepsToDelete, undefined, _copyAllNodes, false, true)
			return {...state, nodes: _copyAllNodes}
		case CHANGE_NODE:
			const _steps = wayToChildObj(action.payload.route, false, true)
			const _copyNodes = JSON.parse(JSON.stringify(state.nodes))
			setValue(_steps, action.payload.body, _copyNodes, false, false, true)
			return {...state, nodes: _copyNodes}
		default:
			return state
	}
}






