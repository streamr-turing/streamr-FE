import { useContext, useState } from "react"
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom"
import { locationFunction } from "./helper-functions"
import rabbit from '../../images/rabbit.png'
import magnifyingGlass from '../../images/magnifying-glass.png'
import "./_NavBar.scss"
import { UserContext } from "../../Providers/UserContext"

const NavBar = () => {
  const { currentUser } = useContext(UserContext)
  console.log('currentUser', currentUser)
  const [searchKeyPhrase, setKeyPhrase] = useState("")
  let location = useLocation()
  let buttonStyles = locationFunction(location)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setKeyPhrase(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      setKeyPhrase(event.target.value)
      navigate(`/search/${searchKeyPhrase}`)
      clearLogin()
    }
  }

  const handleSubmit = () => {
    clearLogin()
  }

  const clearLogin = () => {
    setKeyPhrase("")
  }

  return (
    <div className="navbar-area">
      <section className="user-info">
        <img src={currentUser.avatarUrl} alt='Picture of your avatar' />
        <p>{currentUser.username}</p>
      </section>
      <nav className="search-navigation">
        <ul>
          <div className='search-bar-and-magnifying-glass-container'>
            <li>
              <input
                type='text'
                placeholder='Search'
                name='search'
                value={searchKeyPhrase}
                onChange={handleChange}
                onKeyDown={event => handleKeyDown(event)}
                className='search-input'
              />
            </li>
            <Link to={`/search/${searchKeyPhrase}`}><img src={magnifyingGlass} className='magnifying-glass-icon' onClick={handleSubmit} /></Link>
          </div>
          <li>
            <NavLink
              className={buttonStyles.homeButton}
              id='home-button'
              to='/'
            >
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={buttonStyles.watchlistButton}
              id='watchlist-button'
              to='/watchlist'
            >
              <p>My Watchlist</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
