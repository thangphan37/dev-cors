import * as React from 'react'
import Amplify, {Auth} from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'us-west-2.',
    userPoolId: 'us-west-2_ltdxXTVoV',
    userPoolWebClientId: '7n2162uuqkck3jpa4cjv7fnh69',
  },
})
const username = 'Username'
const password = 'Password@1'

function Credentials() {
  const [idToken, setIdToken] = React.useState('')
  async function signUp() {
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email: 'email@gmail.com',
        },
      })
      console.log(user)
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password)

      console.log('user', user)
      setIdToken(user.signInUserSession.idToken.jwtToken)
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  async function callAPIGateway() {
    try {
      console.log('idToken', idToken)
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY}/credentials`,
        {
          headers: {
            Authorization: idToken,
          },
        },
      )
    } catch (error) {
      console.log('error calling API gateway', error)
    }
  }

  return (
    <div>
      <h1>Credentials</h1>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={callAPIGateway}>Call API gateway</button>
    </div>
  )
}

export default Credentials
