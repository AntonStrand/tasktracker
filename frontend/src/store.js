/**
 * Initialize redux store.
 */

import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import reducers from './reducers/'

const socket = io()
const socketMiddleware = createSocketIoMiddleware(socket, 'ws/')

export default applyMiddleware(socketMiddleware)(createStore)(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
