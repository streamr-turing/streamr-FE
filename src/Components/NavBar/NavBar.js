
import { NavLink } from "react-router-dom"

import "./_NavBar.scss"
import rabbit from '../../images/rabbit.png'

const NavBar = () => {
//username, avatarUrl, setClicked, clicked for props
  const handleChange = (event) => {
    const value = event.target.value
    // This function takes in the text input of the search bar and sets the input value to the local variable value. I am thinking that the search functionality/setting state will be handled from here.
  }

  // const isClicked = (clicked) => {
  //     let homeButton
  //     let watchlistButton
  //   if(clicked === 'home') {
  //       homeButton = 'hide'
  //       watchlistButton = 'show-button'
  //   } else if (clicked === 'watchlist') {
  //     homeButton = 'show-button'
  //     watchlistButton = 'hide'
  //   } else if (clicked === 'details') {
  //     homeButton = 'show-button'
  //     watchlistButton = 'show-button'
  //   }
  // }

  // Refactor the above function

  return (
    <div className="navbar-area">
      <section className="user-info">
        <img src={rabbit} alt='Picture of your avatar' />
        <p>Courtney</p>
      </section>
      <nav className="search-navigation">
        <ul>
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
          <li>
            <NavLink 
            className="home-button" 
            id='home-button' 
            to='/' 
            >
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink 
            className="watchlist-button" 
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