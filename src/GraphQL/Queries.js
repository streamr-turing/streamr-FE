import { gql } from '@apollo/client'

export const GET_SHOW_DETAILS = gql`
  query showDetails($tmdbId: Int! $userId: Int! $mediaType: String!) {
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
`