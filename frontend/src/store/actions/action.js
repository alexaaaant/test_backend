import {GET_NODES, GET_NODE_CHILD, CHANGE_HIDE, DELETE_NODE, ADD_NODE, CHANGE_NODE} from "../../const"

export const getNodes = (parent_id) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/node?parent_id=${parent_id}`)
	const nodes = await res.json()
	if (res.ok) {
		dispatch({type: GET_NODES, payload: nodes})
	}
}

export const getNodeChild = (node) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/node?parent_id=${node.id}`)
	const nodeChild = await res.json()
	if (res.ok) {
		dispatch({type: GET_NODE_CHILD, payload: {nodeChild: nodeChild, nodeId:node.id}})
		dispatch({type: CHANGE_HIDE, payload: {nodeId: node.id}})
	}
}

export const changeHide = (nodeId) => dispatch => {
	dispatch({type: CHANGE_HIDE, payload: {nodeId:nodeId}})
}

export const deleteNode = (nodeId,parent_id) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/node?nodeId=${nodeId}`, {
		method: 'DELETE'
	})
	if (res.ok) {
		dispatch({type: DELETE_NODE, payload: {nodeId: nodeId, parent_id: parent_id}})
	}
}

export const addChangedNode = (node, nodeId) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/node?nodeId=${nodeId}`, {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(node)
	})
	if (res.ok) {
    dispatch({type: CHANGE_NODE, payload: {node: node, nodeId: nodeId}})
	}
}

export const addNode = (node, nodeId) => async dispatch=>{
	 const res = await fetch(`http://localhost:3001/api/node?parent_id=${nodeId}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(node)
	})
	if (res.ok) {
	let node = await res.json()
    dispatch({type: ADD_NODE, payload: {node: node, nodeId: nodeId}})
	}
}