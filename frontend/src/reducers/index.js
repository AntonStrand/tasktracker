import { combineReducers } from 'redux'
import user from './user'
import form from './form'
import projects from './project'

export default combineReducers({ projects, form, user })
