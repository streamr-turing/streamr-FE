import { useEffect, useContext } from "react"
import useWatchlist from "../../Hooks/useWatchlist"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from '@apollo/client'

import { GET_SHOW_DETAILS } from '../../GraphQL/Queries'
import { UserContext } from "../../Providers/UserContext"

import './_DetailsPage.scss'
import DetailsTable from "./DetailsTable"
import DetailsReccInterface from "./DetailsReccInterface"

import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"

const DetailsPage = () => {
  const [
    watchlistId, 
    findWatchlistId,
    saveError,
    removeError,
    handleSaveShow,
    handleRemoveShow
  ] = useWatchlist(null)

  const { currentUser } = useContext(UserContext)
  const { showId } = useParams()
  const navigate = useNavigate()

  const { error, loading, data } = useQuery(
    GET_SHOW_DETAILS, {
    variables: {
      tmdbId: parseInt(showId),
      userId: parseInt(currentUser.id),
      mediaType: "tv"
    }
  }
  )

  useEffect(() => {
    if (data) findWatchlistId(data.showDetails.tmdbId)
  }, [data])

  const toggleSaved = () => {
    if (!watchlistId) handleSaveShow(data.showDetails)
    else handleRemoveShow(watchlistId)
  }

  if (loading) return <p>Loading...</p>
  if (error) navigate("/error", { replace: true }) //error for page not initially loading
  // if (saveError) GIVE USER FEEDBACK - WAS NOT ABLE TO SAVE TO WATCHLIST (modal?)
  // if (removeError) GIVE USER FEEDBACK - WAS NOT ABLE TO REMOVE FROM WATCHLIST (modal?)

  const { genres, posterUrl, rating, releaseYear, streamingService, summary, title } = data.showDetails
  console.log('ok: ', streamingService)
  return (
    <div className="detail-and-title-container">
      <h1 className="detail-title">{`${title} (${releaseYear})`}</h1>
      {data &&
        <section className="details-parent">
          <div className="details">
            <div className="details__lower">
              <div className="details__lower__left">
                <img
                  data-cy="bookmark"
                  className="details__lower__left__bookmark"
                  src={watchlistId ? savedTrue : savedFalse}
                  alt="bookmark icon"
                  role="button"
                  aria-label="toggle saved to watchlist"
                  aria-pressed={watchlistId}
                  onClick={toggleSaved}
                  tabIndex={0}
                />
                <img
                  data-cy="poster"
                  className="details__lower__left__poster"
                  src={posterUrl}
                  alt={`Poster for ${title}`}
                />
              </div>
              <div className="details__lower__right">
                <div>
                  <DetailsTable data={{
                    streamingService,
                    genres,
                    rating,
                    summary
                  }} />
                </div>
                <DetailsReccInterface id={showId} />
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  )
}

export default DetailsPage