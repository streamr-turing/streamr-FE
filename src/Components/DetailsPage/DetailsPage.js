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

  //USEQUERY HOOK WILL BE USED ONCE SERVER IS CONNECTED
  // const { error, loading, data } = useQuery(
  //   GET_SHOW_DETAILS, {
  //   variables: {
  //     tmdbId: 10,
  //     userId: 1
  //   }
  // })

  // HARDCODED MOCK DATA 
  const data = {
    "tmdbId": 10,
    "title": "Succession",
    "releaseYear": 2022,
    "streamingService": "HBO Max",
    "posterUrl": "https://images2.9c9media.com/image_asset/2021_10_15_b63a41c6-ff48-4364-9d9d-3a3504ab9098_png_2000x3000.jpg",
    "genres": [
        "dark comedy",
        "drama"
    ],
    "rating": 9,
    "summary": "Although he has no plans to step aside as the head of Waystar Royco, the international media conglomerate controlled by his family, aging patriarch Logan Roy is contemplating what the future holds.",
    "recommendedBy": [
        {
            "userId": 2,
            "username": "Hank",
            "avatarUrl": "https://i.natgeofe.com/n/a8ab759f-17a1-44dc-a2c6-9b6a53af4d2b/hedgehog_3x2.jpg"
        },
        {
            "userId": 3,
            "username": "Peggy",
            "avatarUrl": "https://animals.sandiegozoo.org/sites/default/files/2016-11/animals_hero_giraffe_1_0.jpg"
        }
    ]
}

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

  return (
    <>
      { data &&
        <section className="details-parent">
          <div className="details">
            <div className="details__lower">
              <div className="details__lower__left">
                <h1 className="details__title">{`${data.title} (${data.releaseYear})`}</h1>
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
                  src={data.posterUrl} 
                  alt={`Poster for ${data.title}`}
                />
              </div>
              <div className="details__lower__right">
                <DetailsTable data={data}/>
                <p>{data.summary}</p>
                <DetailsReccInterface 
                  id={data.tmdbId} 
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