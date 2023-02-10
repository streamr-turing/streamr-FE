import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'
import WatchListItem from '../WatchListItem/WatchListItem'
import "./_WatchListPage.scss"

const WatchListPage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("HERE: ", currentUser.watchlist)

  const watchListResult = () => {
    const watchList = currentUser.watchlist.map(savedItem => {
      return (
          <WatchListItem
            poster={savedItem.thumbnailUrl}
            title={savedItem.title}
            releaseYear={savedItem.releaseYear}
            rating={savedItem.rating}
            key={savedItem.tmdbId}
            genres={savedItem.genres}
          />
      )
    })
    return watchList
  }


  return (
    <div className="watch-list-container">
      <h1 className="watch-list-title">My Watch List</h1>
      {watchListResult()}
    </div>
  )
}

export default WatchListPage