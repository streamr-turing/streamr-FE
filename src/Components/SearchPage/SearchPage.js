import { UserContext } from '../../Providers/UserContext'
import { useEffect, useState, useContext } from "react"
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import "./_SearchPage.scss"

const SearchPage = () => {
  const { currentUser } = useContext(UserContext)
  console.log("YO YO: ", currentUser.recommendations)

  const showCards = currentUser.recommendations.map(show => {
    return (
      <SearchResultCard poster={show.show.thumbnailUrl} title={show.show.title} year={show.show.releaseYear}/>
    )
  })

  return (
    <div className="search-and-poster-container">
      <h1 className="search-title">Search Results for ""</h1>
      <div className='mini-poster-container'>
        {showCards}
      </div>
    </div>
  )
}

export default SearchPage