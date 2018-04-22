import React from 'react'
import './App.css'
import SignUpForm from './components/auth/SignUpForm'
import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/pages/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'
import Project from './components/pages/Project'

const App = () => (
  <Router>
    <div className='wrapper'>
      <Switch>
        <Route exact path='/' component={SignUpForm} />
        <Route path='/login' component={LoginForm} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/project/:id' component={Project} />
      </Switch>
    </div>
  </Router>
)

export default App
