import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'

import { GET_SHOW_DETAILS } from '../../GraphQL/Queries'
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from "../../GraphQL/Mutations"
import { UserContext } from "../../Providers/UserContext"

import './_DetailsPage.scss'
import DetailsTable from "./DetailsTable"
import DetailsReccInterface from "./DetailsReccInterface"

import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"

const DetailsPage = () => {
  const [watchlistId, setWatchlistId] = useState(null)

  const { showId } = useParams()
  const navigate = useNavigate()

  const { 
    currentUser, 
    addToWatchList, 
    removeFromWatchList 
  } = useContext(UserContext)

  const [saveShowServer] = useMutation(ADD_TO_WATCHLIST)
  const [removeShowServer, removeShowResponse] = useMutation(REMOVE_FROM_WATCHLIST)

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
    if (data) {
      console.log(data)
      setWatchlistId(findWatchlistId())
    }
  }, [data])

  const findWatchlistId = () => {
    const match = currentUser.watchlistItems.find(item => item.show.tmdbId === data.tmdbId)
    return match ? match.watchlistItemId : null
  }

  const toggleSaved = () => {
    if (!watchlistId) handleSaveShow()
    else handleRemoveShow()
  }

  const handleSaveShow = async () => {
    const { data } = await saveShowServer({
      variables: {
        tmdbId: parseInt(showId),
        userId: currentUser.id,
        mediaType: "tv"
    }})
    const currentShow = {
      "watchlistItemId": parseInt(data.createWatchlistItem.id),
      "tmdbId": parseInt(showId),
      "title": title,
      "releaseYear": releaseYear,
      "posterUrl": posterUrl
    }
    addToWatchList(currentShow)
    setWatchlistId(parseInt(data.createWatchlistItem.id))
  }

  const handleRemoveShow = () => {
    removeShowServer({ variables: { id: watchlistId }})
    removeFromWatchList(parseInt(showId))
    setWatchlistId(null)
  }

  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error)
    navigate("/error") 
  }

  // const { genres, posterUrl, rating, releaseYear, streamingService, summary, title } = data.showDetails
  const { genres, posterUrl, rating, releaseYear, streamingService, summary, title } = {
    "tmdbId": 1400,
    "title": "Seinfeld",
    "releaseYear": "1989",
    "streamingService": [
      {
        "logoPath": "https://image.tmdb.org/t/p/w500/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
        "providerName": "Netflix"
      },
      {
        "logoPath": "https://image.tmdb.org/t/p/w500/mShqQVDhHoK7VUbfYG3Un6xE8Mv.jpg",
        "providerName": "Netflix basic with Ads"
      }
    ],
    "posterUrl": "https://image.tmdb.org/t/p/w500/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg",
    "genres": [
      "Comedy"
    ],
    "rating": 8.3,
    "summary": "A stand-up comedian and his three offbeat friends weather the pitfalls and payoffs of life in New York City in the '90s. It's a show about nothing.",
    "mediaType": "tv",
    "recommendedBy": []
  }

  return (
    <>
      { data &&
        <section className="details-parent">
          <div className="details">
            <div className="details__lower">
              <div className="details__lower__left">
                <h1 className="details__title">{`${title} (${releaseYear})`}</h1>
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
                    rating
                  }}/>
                  <p>{summary}</p>
                </div>
                <DetailsReccInterface id={showId} />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default DetailsPage