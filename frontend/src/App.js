import React from 'react'
import './App.css'
import SignUpForm from './components/auth/SignUpForm'
// import io from 'socket.io-client'

// const socket = io()

const App = () => (
  <div className='App'>
    <header className='App-header'>
      <h1 className='App-title'>Welcome to React</h1>
    </header>
    <p className='App-intro'>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <SignUpForm />
  </div>
)

export default App
