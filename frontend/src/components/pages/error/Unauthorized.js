import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = props =>
  console.log(props) || (
    <div>
      <h1>401</h1>
      <h4>- unauthorized</h4>
      <p>
        You need to login to access {props.to ? <b>{props.to}</b> : 'this page'}.
      </p>
      <Link to='/login'>
        <button>Log in</button>
      </Link>
      <Link to='/'>
        <button>Sign up</button>
      </Link>
    </div>
  )

export default Unauthorized
