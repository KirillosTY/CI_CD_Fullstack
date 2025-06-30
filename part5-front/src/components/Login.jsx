import PropTypes from 'prop-types'
import React from 'react'


const Login  = ({ username,password,setUsername,setPassword,submit }) => {

  return(
    <form onSubmit={submit}>
      <div>
        Username: <input
          data-testid='username'
          type="text"
          value={username}
          name="username"
          onChange={setUsername}
        />
      </div>

      <div>
        Password: <input
          data-testid='password'
          type="password"
          value={password}
          name="password"
          onChange={setPassword}
        />
      </div>
      <button data-testid='login' type="submit">login</button>
    </form>

  )

}

Login.propTypes = {
  submit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login


