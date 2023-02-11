import { UserContext } from '../../Providers/UserContext'
import { useEffect, useState, useContext } from "react"
import { NavLink, useLocation, Link } from "react-router-dom"

import { locationFunction } from "./helper-functions"

import "./_NavBar.scss"
import rabbit from '../../images/rabbit.png'
import magnifyingGlass from '../../images/magnifying-glass.png'

const NavBar = () => {
  const [searchKeyPhrase, setKeyPhrase] = useState("")

  let location = useLocation()
  let buttonStyles = locationFunction(location)

  const handleChange = (event) => {
    setKeyPhrase(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      setKeyPhrase(event.target.value)
      console.log("YAS QUWEEN: ", searchKeyPhrase)
    }
  }

  const handleSubmit = () => {
    console.log("YAS KING: ", searchKeyPhrase)
  }

  // const clearLogin = () => {
  //   setSignInData({
  //     ...signInData,
  //     username: '',
  //     password: '',
  //     validSignIn: false
  //   })
  // }

  return (
    <div className="navbar-area">
      <section className="user-info">
        <img src={rabbit} alt='Picture of your avatar' />
        <p>Courtney</p>
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
            <Link to={`/search/${searchKeyPhrase}`}><img src={magnifyingGlass} className='magnifying-glass-icon' onClick={handleSubmit}/></Link>
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
