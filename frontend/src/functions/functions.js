export const wayToChildObj = (route, hide, withoutChild) => {
    let steps = []
    let string = ''
    for (let i = 0; i < route.length; i++) {
        string = string + route[i]
        route[i] !== '.' && steps.push(string) && steps.push('child_nodes')
    }
    hide && steps.splice(-1, 1) && steps.push('hide')
    withoutChild && steps.splice(-1, 1)
    return steps
}

export const addNodeToObj = (path, node, obj) => {
    if (path.length > 1) {
        if (!obj.hasOwnProperty(path[0]) || typeof obj[path[0]] !== "object") obj[path[0]] = {}
        return addNodeToObj(path.slice(1), node, obj[path[0]])
    } else {
        obj.loaded = true
        obj[path[0]] = node
        return obj
    }
}

export const changeHide = (path, currentHide, obj, hide) => {
    if (path.length > 1) {
        if (!obj.hasOwnProperty(path[0]) || typeof obj[path[0]] !== "object") obj[path[0]] = {}
        return changeHide(path.slice(1), currentHide, obj[path[0]], hide)
    } else {
        obj[path[0]] = !currentHide
        return obj
    }
}

export const deleteNode = (path, obj) => {
    if (path.length > 1) {
        if (!obj.hasOwnProperty(path[0]) || typeof obj[path[0]] !== "object") obj[path[0]] = {}
        return deleteNode(path.slice(1), obj[path[0]])
    } else {
        delete obj[path[0]]
        return obj
    }
}

export const changeNode = (path, node, obj) => {
    if (path.length > 1) {
        if (!obj.hasOwnProperty(path[0]) || typeof obj[path[0]] !== "object") obj[path[0]] = {}
        return changeNode(path.slice(1), node, obj[path[0]])
    } else {
        obj[path[0]] = node
        return obj
    }
}

