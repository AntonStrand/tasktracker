import React from 'react'
import './App.css'
import SignUpForm from './components/auth/SignUpForm'
import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/pages/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import io from 'socket.io-client'

// const socket = io()

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={SignUpForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/dashboard' component={Dashboard} />
    </Switch>
  </Router>
)

export default App
