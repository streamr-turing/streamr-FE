import { useState, useEffect, useContext } from "react"

import { UserContext } from "../Providers/UserContext"

const useWatchlistId = defaultState => {
  const [watchlistId, setWatchlistId] = useState(defaultState)
  const { currentUser } = useContext(UserContext)
  
  useEffect(() => {
    findWatchlistId()
  }, [])

  const findWatchlistId = id => {
    const match = currentUser.watchlistItems.find(item => item.show.tmdbId === id)
    setWatchlistId(match ? match.id : null)
  }

  return [watchlistId, setWatchlistId, findWatchlistId]
}

export default useWatchlistId