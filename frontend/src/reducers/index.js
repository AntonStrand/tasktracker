import { combineReducers } from 'redux'
import user from './user'
import form from './form'
import projects from './project'
import tasks from './task'

export default combineReducers({ projects, form, user, tasks })
