import {GET_NODES, GET_NODE_CHILD, CHANGE_HIDE} from "../../const"

export  const  getNodes = () => async dispatch => {
	const res = await fetch('http://localhost:3001/api/get')
	const nodes = await res.json()
	if (res.ok) {
		dispatch({type:GET_NODES, payload:nodes})
	}
}

export const getNodeChild = (route) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/get/node?route=${route}`)
	const nodeChild = await res.json()
	if (res.ok) {
		dispatch({type:GET_NODE_CHILD, payload:nodeChild})
	}
}

export const changeHide = (route, hide) => dispatch => {
	dispatch({type:CHANGE_HIDE, payload:{route:route, hide: hide}})
}
