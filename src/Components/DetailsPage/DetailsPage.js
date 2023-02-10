import { useEffect, useState, useContext } from "react"
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
  const [isSaved, setIsSaved] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { 
    currentUser, 
    addToWatchList, 
    removeFromWatchList 
  } = useContext(UserContext)

  const { error, loading, data } = useQuery(
    GET_SHOW_DETAILS, {
      variables: {
        tmdbId: parseInt(id),
        userId: currentUser.id,
        mediaType: "tv"
      }
    })

  useEffect(() => {
    if (data) setIsSaved(findIfSaved())
  }, [data])

  const findIfSaved = () => currentUser.watchlist.some(show => show.tmdbId === data.tmdbId)

  const toggleSaved = () => {
    const currentShow = {
      "tmdbId": parseInt(id),
      "title": title,
      "releaseYear": releaseYear,
      "thumbnailUrl": posterUrl
    }
    if (!isSaved) {
      addToWatchList(currentShow)
      setIsSaved(true)
    }
    else {
      removeFromWatchList(parseInt(id))
      setIsSaved(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) navigate("/error") 

  const { genres, posterUrl, rating, releaseYear, streamingService, summary, title } = data.showDetails

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
                  src={isSaved ? savedTrue : savedFalse} 
                  alt="bookmark icon"
                  role="button"
                  aria-label="toggle saved to watchlist"
                  aria-pressed={isSaved}
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
                <DetailsReccInterface id={id} />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default DetailsPage