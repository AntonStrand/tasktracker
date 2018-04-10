import { createStore } from 'redux'
import authReducer from './reducers/authentication'

export default createStore(authReducer)
