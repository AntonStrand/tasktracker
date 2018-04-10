/**
 * Initialize redux store.
 */

import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import authReducer from './reducers/authentication'

const socket = io()
const socketMiddleware = createSocketIoMiddleware(socket, 'ws/')

export default applyMiddleware(socketMiddleware)(createStore)(
  authReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
