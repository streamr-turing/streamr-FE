
import './_LoginPage.scss'
import tv from '../../images/tv.png'

const LoginPage = () => {

  const handleSubmit = (event) => {
    event.preventDefault()

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
          // value={username}
          // onChange={handleChange}
          className="input"
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          // value={password}
          // onChange={handleChange}
          className="input"
        />
        <button onClick={event => handleSubmit(event)}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage