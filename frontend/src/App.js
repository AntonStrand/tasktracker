import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Dashboard from './components/pages/Dashboard'
import PrivateRoute from './containers/PrivateRoute'
import Project from './components/pages/Project/'
import PageNotFound from './components/pages/error/PageNotFound'

const App = () => (
  <Router>
    <div className='wrapper'>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute path='/project/:id' component={Project} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App
