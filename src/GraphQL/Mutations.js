import { gql } from '@apollo/client'

export const ADD_TO_WATCHLIST = gql`
  mutation createWatchlistItem(
    $tmdbId: Int! 
    $userId: Int! 
    $mediaType: String!
  ) {
    createWatchlistItem(
      tmdbId: $tmdbId 
      userId: $userId 
      mediaType: $mediaType
    ) {
      id
      tmdbId
      userId
    }
  }
`

export const REMOVE_FROM_WATCHLIST = gql`
  mutation deleteWatchlistItem($id: ID!) {
    deleteWatchlistItem(id: $id) {
      id
    }
  }
`

export const SEND_RECOMMENDATION = gql`
  mutation createRecommendation (
    $tmdbId: Int!
    $recommenderId: Int!
    $recommendeeId: Int!
    $mediaType: String!
) {
    createRecommendation (
        tmdbId: $tmdbId,
        recommenderId: $recommenderId,
        recommendeeId: $recommendeeId,
        mediaType: $mediaType
    )
    {
        tmdbId
        recommenderId
        recommendeeId
    }
  }
`