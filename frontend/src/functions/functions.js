export const wayToChildObj = (way, hide) => {
	let steps = []
	let string = ''
	if (way.length === 1) {
		steps.push(way)
	} else {
		for (let i = 0; i < way.length - 2; i++) {
			if (way[i] !== '.') {
				string = string + way[i]
				steps.push(string)
			} else {
				string = string + way[i]
			}
		}
	}
	if (hide) {
		steps.push('hide')
	} else {
		steps.push('child_nodes')
	}
	return steps
}

export const setValue = (propertyPath, value, obj, hide) => {
	if (propertyPath.length > 1) {
		if (!obj.hasOwnProperty(propertyPath[0]) || typeof obj[propertyPath[0]] !== "object") obj[propertyPath[0]] = {}
		if (hide) {
			return setValue(propertyPath.slice(1), value, obj[propertyPath[0]], hide)
		}
		return setValue(propertyPath.slice(1), value, obj[propertyPath[0]])
	} else {
		if (hide) {
			obj[propertyPath[0]] = !value
		} else {
			obj.loaded = true
			obj[propertyPath[0]] = value
		}
		return obj
	}
}