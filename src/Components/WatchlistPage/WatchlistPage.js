import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'
import WatchListItem from '../WatchListItem/WatchListItem'
import NoWatchListItems from '../NoWatchListItems/NoWatchListItems'
import "./_WatchlistPage.scss"

const WatchListPage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("HERE: ", currentUser)

  const watchListResult = () => {
    if(currentUser.watchlist.length){
      const watchList = currentUser.watchlist.map(savedItem => {
        return (
            <WatchListItem
              poster={savedItem.posterUrl}
              title={savedItem.title}
              releaseYear={savedItem.releaseYear}
              rating={savedItem.rating}
              key={savedItem.watchlistItemId}
              genres={savedItem.genres}
              tmdbId={savedItem.tmdbId}
            />
        )
      })
      return watchList
    }
    else{
      return <NoWatchListItems/>
    }
  }


  return (
    <div className="watch-list-container">
      <h1 className="watch-list-title">My Watch List</h1>
      {watchListResult()}
    </div>
  )
}

export default WatchListPage