import { UserContext } from '../../Providers/UserContext'
import { useEffect, useState, useContext } from "react"
import { NavLink, useLocation, Link } from "react-router-dom"

import { locationFunction } from "./helper-functions"

import "./_NavBar.scss"
import rabbit from '../../images/rabbit.png'
import magnifyingGlass from '../../images/magnifying-glass.png'

const NavBar = () => {
  const [searchTitle, setSearchTitle] = useState("")

  //username, avatarUrl for props
  let location = useLocation()
  let buttonStyles = locationFunction(location)

  const handleChange = (event) => {
    setSearchTitle(event.target.value)
    // This function takes in the text input of the search bar and sets the input value to the local variable value. I am thinking that the search functionality/setting state will be handled from here.
  }

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
                // value={this.state.value}
                onChange={handleChange}
                className='search-input'
              />
            </li>
            <Link to='/search'><img src={magnifyingGlass} className='magnifying-glass-icon' /></Link>
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
