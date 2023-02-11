import { UserContext } from '../../Providers/UserContext'
import { useEffect, useState, useContext } from "react"
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import NoSearchResults from '../NoSearchResults/NoSearchResults'
import "./_SearchPage.scss"

const SearchPage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("YO YO: ", currentUser.recommendations)
  
  const searchResult = () => {
    if (currentUser.recommendations.length) {
      const showCards = currentUser.recommendations.map(show => {
        return (
          <SearchResultCard
            poster={show.show.thumbnailUrl}
            title={show.show.title}
            year={show.show.releaseYear} 
            key={show.show.tmdbId}
          />
        )
      })
      return showCards
    }
    else {
      return <NoSearchResults />
    }
  }

  const classnameResult = () => {
    if (currentUser.recommendations.length) {
      return "mini-poster-container"
    }
    else {
      return "search-error-container"
    }
  }


  return (
    <div className="search-and-poster-container">
      <h1 className="search-title">Search Results for ""</h1>
      <div className={classnameResult()}>
        {searchResult()}
      </div>
    </div>
  )
}

export default SearchPage