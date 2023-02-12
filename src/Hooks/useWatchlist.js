import { useState, useEffect, useContext } from "react"
import { useMutation } from "@apollo/client"
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from "../GraphQL/Mutations"

import { UserContext } from "../Providers/UserContext"

const useWatchlist = defaultState => {
  const { currentUser, addToWatchList, removeFromWatchList } = useContext(UserContext)

  const [watchlistId, setWatchlistId] = useState(defaultState)
  const [saveError, setSaveError] = useState(null)
  const [removeError, setRemoveError] = useState(null)

  const [saveShowServer] = useMutation(ADD_TO_WATCHLIST)
  const [removeShowServer] = useMutation(REMOVE_FROM_WATCHLIST)

  useEffect(() => {
    findWatchlistId()
  }, [])

  const findWatchlistId = id => {
    const match = currentUser.watchlistItems.find(item => item.show.tmdbId === id)
    setWatchlistId(match ? match.id : null)
  }

  const handleSaveShow = async (showDetails) => {
    const { data, error } = await saveShowServer({
      variables: {
        tmdbId: parseInt(showDetails.tmdbId),
        userId: parseInt(currentUser.id),
        mediaType: "tv"
    }})
    if (error) {
      setSaveError(error)
      return
    }
    const currentShow = {
      "id": parseInt(data.createWatchlistItem.id),
      "show": {
        "tmdbId": parseInt(showDetails.tmdbId),
        "title": showDetails.title,
        "releaseYear": showDetails.releaseYear,
        "posterUrl": showDetails.posterUrl,
        "mediaType": "tv",
        "genres": showDetails.genres,
        "rating": showDetails.rating
      }
    }
    addToWatchList(currentShow)
    setWatchlistId(parseInt(data.createWatchlistItem.id))
  }

  const handleRemoveShow = async showId => {
    const { error } = await removeShowServer({ variables: { id: watchlistId }})
    if (error) {
      setRemoveError(error)
      return
    }
    removeFromWatchList(showId)
    setWatchlistId(null)
  }

  return [
    watchlistId, 
    setWatchlistId, 
    findWatchlistId,
    saveError,
    removeError,
    handleSaveShow,
    handleRemoveShow
  ]
}

export default useWatchlist