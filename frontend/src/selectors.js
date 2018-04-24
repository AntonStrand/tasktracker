const indexToArray = index => Object.keys(index).map(id => index[id])

export const getProjects = ({ projectsById }) => indexToArray(projectsById)

export const getTasks = indexToArray
