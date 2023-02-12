import { gql } from '@apollo/client'

export const GET_USER = gql`
  query fetchUser($id: ID!) {
    fetchUser (id: $id) {
      id
      username
      avatarUrl
      watchlistItems {
        id
        show {
          tmdbId
          title
          releaseYear
          posterUrl
          mediaType
          genres
          rating
        }
      }
      recommendations {
        recommendeeId
        recommender {
          id
          username
          avatarUrl
        }
        show {
          tmdbId
          title
          releaseYear
          rating
          genres
          posterUrl
          mediaType
        }
        createdAt
      }
    }
  }
`

export const GET_SHOW_DETAILS = gql`
  query showDetails(
    $tmdbId: Int! 
    $userId: Int! 
    $mediaType: String!
  ) {
    showDetails(
      tmdbId: $tmdbId 
      userId: $userId 
      mediaType: $mediaType
    ) {
      tmdbId
      title
      releaseYear
      streamingService {
        logoPath
        providerName
      }
      posterUrl
      genres
      rating
      summary
      mediaType
      recommendedBy {
        id
        username
        avatarUrl
      }
    }
  }
`
export const GET_SEARCH_RESULTS = gql`
query shows($query: String!){
  shows(
      query: $query
  )
  {
      tmdbId
      title
      imageUrl
      yearCreated
  }
}
`
export const GET_ALL_USERS = gql`
  query {
    users {
        id
        username
    }
  }
`