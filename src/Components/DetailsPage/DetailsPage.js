import { useEffect, useState, useContext } from "react"
import { useQuery } from '@apollo/client'

import { GET_SHOW_DETAILS } from '../../GraphQL/Queries'
import { UserContext } from "../../Providers/UserContext"

import DetailsTable from "./DetailsTable"
import DetailsReccInterface from "./DetailsReccInterface"
import './_DetailsPage.scss'
import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"

const DetailsPage = () => {
  const [isSaved, setIsSaved] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { 
    currentUser, 
    addToWatchList, 
    removeFromWatchList 
  } = useContext(UserContext)

  const { error, loading, data } = useQuery(
    GET_SHOW_DETAILS, {
    variables: {
      tmdbId: 4610,
      userId: 1,
      mediaType: "tv"
    }
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    if (data) setIsSaved(findIfSaved())
  }, [data])

  const findIfSaved = () => currentUser.watchlist.some(show => show.tmdbId === data.tmdbId)

  const toggleSaved = () => {
    console.log(data.tmdbId)
    const payload = {
      "tmdbId": data.tmdbId,
      "title": data.title,
      "releaseYear": data.releaseYear,
      "thumbnailUrl": data.posterUrl
    }

    if (!isSaved) {
      addToWatchList(payload)
      setIsSaved(true)
    }
    else {
      removeFromWatchList(data.tmdbId)
      setIsSaved(false)
    }
  }

  const showModal = () => {
    console.log("this function will open the send recc modal")
    setModalOpen(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  const { tmdbId, genres, posterUrl, rating, releaseYear, streamingService, summary, title } = data.showDetails

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
                <DetailsTable data={{
                  streamingService,
                  genres,
                  rating
                }}/>
                <p>{summary}</p>
                <DetailsReccInterface 
                  id={tmdbId} 
                  showModal={showModal} 
                />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default DetailsPage