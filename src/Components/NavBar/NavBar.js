
import { NavLink } from "react-router-dom"
import "./_NavBar.scss"

const NavBar = ({ username, avatarUrl, setClicked, clicked }) => {

  const handleChange = (event) => {
    const value = event.target.value
    // This function takes in the text input of the search bar and sets the input value to the local variable value. I am thinking that the search functionality/setting state will be handled from here.
  }

  const isClicked = (clicked) => {
      let homeButton
      let watchlistButton
    if(clicked === 'home') {
        homeButton = 'hide'
        watchlistButton = 'show-button'
    } else if (clicked === 'watchlist') {
      homeButton = 'show-button'
      watchlistButton = 'hide'
    } else if (clicked === 'details') {
      homeButton = 'show-button'
      watchlistButton = 'show-button'
    }
  }

  // Refactor the above function

  return (
    <div className="navbar-area">
      <section className="user-info">
        <img src={avatarUrl} alt='Picture of your avatar' />
        <p>{username}</p>
      </section>
      <section className="search-navigation">
        <input 
        type='text'
        placeholder='Search'
        name='search'
        value={this.state.value}
        onChange={handleChange}
        className='search-input'
        />
        <NavLink className={isClicked(clicked)} id='home-button' to='/' onClick={() => setClicked('home')}>
          <p>Home</p>
        </NavLink>
        <NavLink className={isClicked(clicked)} id='watchlist-button' to='/watchlist' onClick={() => setClicked('watchlist')}>
          <p>My Watchlist</p>
        </NavLink>
      </section>
    </div>
  )
}

export default NavBar