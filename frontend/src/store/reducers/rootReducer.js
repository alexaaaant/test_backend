import { GET_NODES, GET_NODE_CHILD, CHANGE_HIDE, DELETE_NODE, ADD_NODE, CHANGE_NODE } from "../../const"

const initialState = ({
    nodes: new Map(),
    headNodes: []
})

export function reduce(state = initialState, action) {
    let copyNodes = new Map(state.nodes)
    switch (action.type) {
        case GET_NODES:
            action.payload.forEach(node => copyNodes.set(node.id, node))
            return { ...state, nodes: copyNodes, headNodes: [...copyNodes.keys()] }
        case GET_NODE_CHILD:
            copyNodes.get(action.payload.nodeId).loaded = true
            copyNodes.get(action.payload.nodeId).child_nodes = action.payload.nodeChild
            action.payload.nodeChild.forEach(node => copyNodes.set(node.id, node))
            return { ...state, nodes: copyNodes }
        case CHANGE_HIDE:
            let node = copyNodes.get(action.payload.nodeId)
            node.hide = !node.hide
            return { ...state, nodes: copyNodes }
        case DELETE_NODE:
            copyNodes.delete(action.payload.nodeId)
            let newArray = copyNodes.get(action.payload.parent_id).child_nodes.filter(item => item.id !== action.payload.nodeId)
            copyNodes.get(action.payload.parent_id).hasChild = (newArray.length > 0)
            copyNodes.get(action.payload.parent_id).child_nodes = newArray
            return { ...state, nodes: copyNodes }
        case ADD_NODE:
            copyNodes.get(action.payload.nodeId)['child_nodes'].push(action.payload.node)
            copyNodes.get(action.payload.nodeId).hasChild = true
            copyNodes.set(action.payload.node.id, action.payload.node)
            return { ...state, nodes: copyNodes }
        case CHANGE_NODE:
            Object.assign(copyNodes.get(action.payload.nodeId), action.payload.node)
            return { ...state, nodes: copyNodes }

        default:
            return state
    }
}






