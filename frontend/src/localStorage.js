export const setState = state => {
  try {
    const localStorageState = JSON.stringify({
      user: state.user,
      projects: state.projects,
      tasks: state.tasks
    })
    localStorage.setItem('taskTracker', localStorageState)
  } catch (error) {}
}

export const getState = () => {
  try {
    return JSON.parse(localStorage.getItem('taskTracker')) || undefined
  } catch (error) {
    return undefined
  }
}
