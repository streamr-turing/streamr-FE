
import './_LoginPage.scss'
import tv from '../../tv.png'
import { AllUsersContext } from '../../Providers/AllUsersContext'
import { useContext, useState } from 'react'

const LoginPage = () => {
  const { allUsers } = useContext(AllUsersContext)
  console.log('LoginInfo', allUsers)

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
    validSignIn: true
  })

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('signInData', signInData)
    const userFound = allUsers.find(signInData.username)
    if(userFound && signInData.password === 'streamr' ) {
        //we want to fetch current user from database and route to homepage

    } else {
      setSignInData({
        ...signInData,
        validSignIn: false
      })
    }

  }

  return (
    <div className="login-background">
      <div className="login-area">
        <section className="logo-section">
          <img src={tv} alt='Drawing of a TV' />
          <h1>Streamr</h1>
        </section>
        <form className="username-password">
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={signInData.username}
          onChange={handleChange}
          className="input"
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={signInData.password}
          onChange={handleChange}
          className="input"
        />
        <button onClick={event => handleSubmit(event)}>Login</button>
        </form>
        {!signInData.validSignIn && <p>Sorry, the username/password is incorrect. Please try again.</p>}
      </div>
    </div>
  )
}

export default LoginPage