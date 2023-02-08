import { useEffect } from "react"
import { useQuery, gql } from '@apollo/client'

import './_DetailsPage.scss'
import { GET_SHOW_DETAILS } from '../../GraphQL/Queries'

const DetailsPage = () => {
  const {error, loading, data} = useQuery(
    GET_SHOW_DETAILS, { 
      variables: {
        tmdbId: 10,
        userId: 1
      }}
    )

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <h1>details page</h1>
  )
}

export default DetailsPage