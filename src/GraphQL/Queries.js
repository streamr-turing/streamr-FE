import { gql } from '@apollo/client'

export const GET_SHOW_DETAILS = gql`
query getShow($tmdbId: Int!, $userId: Int!) {
  tmdbId
  title
  releaseYear
  streamingService
  posterUrl
  genres
  rating
  summary
  recommendedBy {
      userId
      username
      avatarUrl
  }
}
`