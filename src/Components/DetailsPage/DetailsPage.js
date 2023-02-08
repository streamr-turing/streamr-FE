import { useEffect, useState, useContext } from "react"
import { useQuery } from '@apollo/client'

import './_DetailsPage.scss'
import { GET_SHOW_DETAILS } from '../../GraphQL/Queries'
import { UserContext } from "../../Providers/UserContext"

import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"

const DetailsPage = () => {
  const [isSaved, setIsSaved] = useState(false)

  const { 
    currentUser, 
    addToWatchList, 
    removeFromWatchList 
  } = useContext(UserContext)

  const { error, loading, data } = useQuery(
    GET_SHOW_DETAILS, {
    variables: {
      tmdbId: 10,
      userId: 1
    }
  })

  useEffect(() => {
    console.log(data)
    if (data) setIsSaved(findIfSaved())
  }, [data])

  const findIfSaved = () => currentUser.watchlist.some(show => show.tmbdId === data.tmdbId)

  const toggleSaved = () => {
    console.log(data.tmdbId)
    const payload = {
      "tmbdId": data.tmdbId,
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

  return (
    <>
      { data &&
        <section className="details-section">
          <h1>{`${data.title} (${data.releaseYear})`}</h1>
          <div className="details">
            <div className="details__left">
              <img 
                data-cy="bookmark" 
                className="details__left__bookmark" 
                src={isSaved ? savedTrue : savedFalse} 
                alt="bookmark icon"
                role="button"
                aria-label="toggle saved to watchlist"
                aria-pressed={isSaved}
                onClick={toggleSaved}
                // onKeyDown={e => handleBookmarkKeyDown(e)}
                tabIndex={0}
              />
              <img
                data-cy="poster"
                className="details__left__poster" 
                src={data.posterUrl} 
                alt={`Poster for ${data.title}`}
              />
            </div>
            <div className="details-right">

            </div>
          </div>
        </section>
      }
    </>
  )
}

export default DetailsPage