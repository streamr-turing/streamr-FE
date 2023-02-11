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