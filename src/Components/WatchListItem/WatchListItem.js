import { useContext, useEffect } from "react"
import useWatchlist from "../../Hooks/useWatchlist"
import { NavLink, Link } from "react-router-dom"
import { RecModalContext } from "../../Providers/RecModalContext"

import shareIcon from "../../images/paper-plane.png"
import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"
import './_WatchListItem.scss'

const WatchListItem = ({ posterUrl, title, releaseYear, id, rating, genres, tmdbId  }) => {
  const  { changeModalState, changeModalShow, currentModal } = useContext(RecModalContext)
  const [
    watchlistId,
    findWatchlistId,
    saveError,
    removeError,
    handleSaveShow,
    handleRemoveShow
  ] = useWatchlist(null)

  useEffect(() => {
    findWatchlistId(tmdbId)
  }, [])

  const toggleSaved = () => {
    const showDetails = {
      tmdbId,
      title,
      releaseYear,
      posterUrl,
      genres,
      rating
    }
    if (!watchlistId) handleSaveShow(showDetails)
    else handleRemoveShow(watchlistId)
  }

  const allGenres = genres.reduce((genreCategories, currentGenre) => {
      genreCategories += currentGenre
      if (currentGenre !== genres[genres.length - 1]) {
          genreCategories += " - "
      }
      return genreCategories
  }, "")

  const handleModalChange = () => {
      changeModalState(true)
      changeModalShow(+tmdbId)
    }

  console.log('currentModal', currentModal)

  // if (saveError) GIVE USER FEEDBACK - WAS NOT ABLE TO SAVE TO WATCHLIST (modal?)
  // if (removeError) GIVE USER FEEDBACK - WAS NOT ABLE TO REMOVE FROM WATCHLIST (modal?)

  return (
      <div className="watch-list-card-container">
          <div className="watch-list-poster-and-info">
              <img src={watchlistId ? savedTrue : savedFalse} className='watch-list-bookmark' onClick={toggleSaved} />
              <Link to={`/show/${id}`} className='watch-list-clickable-poster'><img src={posterUrl} className='watch-list-poster-img' /></Link>
              <div className='watch-list-card-info'>
                  <div className="watch-list-title-and-share-container">
                      <NavLink to={`/show/${id}`} className='clickable-title'><h1 className='title'>{title} ({releaseYear})</h1></NavLink>
                      <button 
                      className="share-button"
                      onClick={()=> {
                          handleModalChange()
                        }}
                      >
                          <img src={shareIcon}  className="watch-list-share-icon"
                          alt='Picture of a paper airplane' />
                      </button>
                  </div>
                  <div className="rating-and-genres-container">
                      <h2>Audience Rating: {Math.round(rating * 10) / 10}/10</h2>
                      <h3 className="watch-list-genres">{allGenres}</h3>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default WatchListItem