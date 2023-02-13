import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { GET_SEARCH_RESULTS } from '../../GraphQL/Queries'
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import NoSearchResults from '../NoSearchResults/NoSearchResults'
import Loading from "../Loading/Loading"
import "./_SearchPage.scss"

const SearchPage = () => {
  const navigate = useNavigate()
  let { keyPhrase } = useParams()
  keyPhrase = keyPhrase.split('%20').join(' ')

  const { error, loading, data } = useQuery(
    GET_SEARCH_RESULTS, {
    variables: {
      query: keyPhrase
    }
  }
  )

  const searchResult = () => {
    if (!loading) {
      if (data.shows.length) {
        const showCards = data.shows.map(show => {
          return (
            <SearchResultCard
              posterUrl={show.imageUrl}
              title={show.title}
              releaseYear={show.yearCreated}
              genres={["placeholder genre", "another placeholder genre"]} //placeholders
              rating={7} // placeholder rating until BE adds genres/rating to search results
              key={show.tmdbId}
              tmdbId={show.tmdbId}
            />
          )
        })
        return showCards
      }
      else {
        return <NoSearchResults />
      }
    }
    else {
      return <Loading/>
    }
  }

  const classnameResult = () => {
    if (!loading) {
      if (data.shows.length) {
        return "mini-poster-container"
      }
      else {
        return "search-error-container"
      }
    }
  }

  if (error) {
    console.log(error)
    navigate("/error", { replace: true }) 
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