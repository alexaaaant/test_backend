import {GET_NODES, GET_NODE_CHILD, CHANGE_HIDE, DELETE_NODE, ADD_NODE} from "../../const"
import {wayToChildObj, addNodeToObj, changeHide, deleteNode, addChangedNode} from "../../functions/functions"

const initialState = ({
    nodes: [],
})

export function reduce(state = initialState, action) {
    let copyNodes = JSON.parse(JSON.stringify(state.nodes))
    switch (action.type) {
        case GET_NODES:
            return {...state, nodes: action.payload}
        case GET_NODE_CHILD:
            let steps = wayToChildObj(action.payload.route)
            addNodeToObj(steps, action.payload.nodeChild, copyNodes)
            return {...state, nodes: copyNodes}
        case CHANGE_HIDE:
            let stepsToHide = wayToChildObj(action.payload.route, true)
            changeHide(stepsToHide, action.payload.hide, copyNodes)
            return {...state, nodes: copyNodes}
        case DELETE_NODE:
            let stepsToDelete = wayToChildObj(action.payload, false, true)
            deleteNode(stepsToDelete, copyNodes)
            return {...state, nodes: copyNodes}
        case ADD_NODE:
          let __steps = wayToChildObj(action.payload.route, false, true)
          addChangedNode(__steps, action.payload.body, copyNodes)
            return {...state, nodes: copyNodes}
        default:
            return state
    }
}






