import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useWatchlist from "../../Hooks/useWatchlist"
import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"
import tv from '../../images/tv.png'
import './_SearchResultCard.scss'

const SearchResultCard = ({ posterUrl, title, releaseYear, genres, rating, tmdbId }) => {
  const [hovering, setHover] = useState(false)
  const [
    watchlistId,
    findWatchlistId,
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


  const overlay =
    <div
      className="overlay"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="overlay-text">{title} ({releaseYear.slice(0, 4)})</p>
    </div>

  const imageClassList = hovering ?
    `hover-animation tile-img` :
    `tile-img`

  return (
    <div>
      <img
        data-cy="bookmark-tile"
        className='bookmark bookmark-tile'
        src={watchlistId ? savedTrue : savedFalse}
        alt="bookmark icon"
        onClick={toggleSaved}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <Link to={`/show/${tmdbId}`} data-cy={`poster-${tmdbId}`}><div data-cy="img-container" className="img-container">
        <img
          className={imageClassList}
          src={posterUrl ? posterUrl : tv}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        {hovering && overlay}
      </div></Link>
    </div>
  )
}

export default SearchResultCard