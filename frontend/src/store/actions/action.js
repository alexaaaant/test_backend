import {GET_NODES, GET_NODE_CHILD, CHANGE_HIDE, DELETE_NODE, ADD_NODE} from "../../const"

export const getNodes = () => async dispatch => {
	const res = await fetch('http://localhost:3001/api/get')
	const nodes = await res.json()
	if (res.ok) {
		dispatch({type: GET_NODES, payload: nodes})
	}
}

export const getNodeChild = (route, hide) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/get/node?route=${route}`)
	const nodeChild = await res.json()
	if (res.ok) {
		dispatch({type: GET_NODE_CHILD, payload: {nodeChild: nodeChild, route: route}})
		dispatch({type: CHANGE_HIDE, payload: {route: route, hide: hide}})
	}
}

export const changeHide = (route, hide) => dispatch => {
	dispatch({type: CHANGE_HIDE, payload: {route: route, hide: hide}})
}

export const deleteNode = (route) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/delete/node?route=${route}`, {
		method: 'DELETE'
	})
	if (res.ok) {
		dispatch({type: DELETE_NODE, payload: route})
	}
}

export const changeNode = (body, route) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/patch/node?route=${route}`, {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	})
	if (res.ok) {
    dispatch({type: ADD_NODE, payload: {body, route}})
	}
}

export const addNode = (body, route) => async dispatch => {
	const res = await fetch(`http://localhost:3001/api/post/node?route=${route}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	})
	if (res.ok) {
    let route = await res.json()
    dispatch({type: ADD_NODE, payload: {body, route}})
	}
}