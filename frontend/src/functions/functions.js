export const wayToChildObj = (way, hide, withoutChild) => {
	let steps = []
	let string = ''
	for (let i = 0; i < way.length; i++) {
		if (way[i] !== '.') {
			string = string + way[i]
			steps.push(string)
			steps.push('child_nodes')
		} else {
			string = string + way[i]
		}
	}
	hide && steps.splice(-1, 1) && steps.push('hide')
	withoutChild && steps.splice(-1, 1)

	return steps
}

export const setValue = (propertyPath, value, obj, hide, deleted, change) => {
	if (propertyPath.length > 1) {
		if (!obj.hasOwnProperty(propertyPath[0]) || typeof obj[propertyPath[0]] !== "object") obj[propertyPath[0]] = {}
		if (hide) {
			return setValue(propertyPath.slice(1), value, obj[propertyPath[0]], hide)
		}
		if (deleted) {
			return setValue(propertyPath.slice(1), value, obj[propertyPath[0]], false, true)
		}
		if (change) {
			return setValue(propertyPath.slice(1), value, obj[propertyPath[0]], false, false, true)
		}
		return setValue(propertyPath.slice(1), value, obj[propertyPath[0]])
	} else {
		if (hide) {
			obj[propertyPath[0]] = !value

		} else if (deleted) {
			delete obj[propertyPath[0]]
		} else if (change) {
			obj[propertyPath[0]] = value
		} else {
			obj.loaded = true
			obj[propertyPath[0]] = value
		}
		return obj
	}
}