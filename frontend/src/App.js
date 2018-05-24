import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/pages/Dashboard'
import PrivateRoute from './containers/PrivateRoute'
import Project from './components/pages/Project/'
import LandingPage from './components/pages/LandingPage'
import PageNotFound from './components/pages/error/PageNotFound'

const App = () => (
  <Router>
    <div className='wrapper'>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/login' component={LoginForm} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/project/:id' component={Project} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App
