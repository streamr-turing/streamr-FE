import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'
import WatchListItem from '../WatchListItem/WatchListItem'
import NoWatchListItems from '../NoWatchListItems/NoWatchListItems'
import "./_WatchlistPage.scss"

const WatchListPage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("HERE: ", currentUser)

  const watchListResult = () => {
    if(currentUser.watchlistItems.length){
      const watchList = currentUser.watchlistItems.map(savedItem => {
        return (
            <WatchListItem
              poster={savedItem.show.posterUrl}
              title={savedItem.show.title}
              releaseYear={savedItem.show.releaseYear}
              key={savedItem.id}
              id={savedItem.show.tmdbId}
              // rating={savedItem.show.rating}
              // genres={savedItem.show.genres}
              tmdbId={savedItem.show.tmdbId}
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