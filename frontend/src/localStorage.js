import Maybe from 'folktale/maybe'

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
    const state = JSON.parse(localStorage.getItem('taskTracker'))
    return state ? Maybe.Just(state) : Maybe.Nothing()
  } catch (error) {
    return Maybe.Nothing()
  }
}
