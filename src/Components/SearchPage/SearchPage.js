import { UserContext } from '../../Providers/UserContext'
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { useQuery } from '@apollo/client'
import { GET_SEARCH_RESULTS } from '../../GraphQL/Queries'

import SearchResultCard from '../SearchResultCard/SearchResultCard'
import NoSearchResults from '../NoSearchResults/NoSearchResults'
import "./_SearchPage.scss"

const SearchPage = () => {
  let { keyPhrase } = useParams()
  keyPhrase = keyPhrase.split('%20').join(' ')
  console.log("KIKO: ", keyPhrase)

  const { currentUser } = useContext(UserContext)
  // console.log("YO YO: ", currentUser.recommendations)

  const { error, loading, data } = useQuery(
    GET_SEARCH_RESULTS, {
      variables: {
        query: keyPhrase
      }
    }
  )

  const searchResult = () => {
    if(!loading){
      console.log("DATA HERE: ", data.shows)
      if (data.shows.length) {
        const showCards = data.shows.map(show => {
          return (
            <SearchResultCard
              poster={show.imageUrl}
              title={show.title}
              year={show.yearCreated} 
              key={show.tmdbId}
            />
          )
        })
        return showCards
      }
      else {
        return <NoSearchResults />
      }
    }
    else{
      return <h1>Loading...</h1>
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
      <h1 className="search-title">Search Results for "{keyPhrase}"</h1>
      <div className={classnameResult()}>
        {searchResult()}
      </div>
    </div>
  )
}

export default SearchPage