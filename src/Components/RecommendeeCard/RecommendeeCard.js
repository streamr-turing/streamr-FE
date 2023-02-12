import { useState, useEffect, useContext } from "react"
import useWatchlist from "../../Hooks/useWatchlist"
import { NavLink, Link } from "react-router-dom"

import { UserContext } from "../../Providers/UserContext"

import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"
import './_RecommendeeCard.scss'

const RecommendeeCard = ({ poster, title, releaseYear, rating, genres, date, id }) => {
  const [
    watchlistId,
    setWatchlistId,
    findWatchlistId,
    saveError,
    removeError,
    handleSaveShow,
    handleRemoveShow
  ] = useWatchlist(null)

  useEffect(() => {
    findWatchlistId(id)
  }, [])

  const toggleSaved = () => {
    // if (!watchlistId) handleSaveShow(data.showDetails)
    // else handleRemoveShow(watchlistId)
  }

  const allGenres = genres.reduce((genreCategories, currentGenre) => {
    genreCategories += currentGenre
    if (currentGenre !== genres[genres.length - 1]) {
      genreCategories += " - "
    }
    return genreCategories
  }, "")

  const formatDate = () => {
    date = date.slice(0, 10).split('-')
    let day = parseInt(date[2])
    let month = parseInt(date[1])
    let year = date[0]
    switch (month) {
      case 1: month = "Jan"; break;
      case 2: month = "Feb"; break;
      case 3: month = "Mar"; break;
      case 4: month = "Apr"; break;
      case 5: month = "May"; break;
      case 6: month = "Jun"; break;
      case 7: month = "Jul"; break;
      case 8: month = "Aug"; break;
      case 9: month = "Sep"; break;
      case 10: month = "Oct"; break;
      case 11: month = "Nov"; break;
      case 12: month = "Dec"; break;
    }
    date = `${month} ${day} ${year}`
    return date
  }

  return (
    <div>
      <div className="recommendee-card-container">
        <img src={watchlistId ? savedTrue : savedFalse} className='home-bookmark' onClick={toggleSaved} />
        <Link to={`/show/${id}`} className='clickable-poster'><img src={poster} className='poster-img' /></Link>
        <div className='recommendee-card-info'>
          <NavLink to={`/show/${id}`} className='clickable-title'><h1 className='title'>{title} ({releaseYear})</h1></NavLink>
          <h2 className='audience-rating'>Audience Rating: {rating}/10</h2>
          <h3>{allGenres}</h3>
        </div>
      </div>
      <h4 className='post-date'>{formatDate()}</h4>
    </div>
  )
}

export default RecommendeeCard