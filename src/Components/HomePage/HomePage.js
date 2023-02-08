import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'

import TimelinePost from "../TimelinePost/TimelinePost"
import "./_HomePage.scss"

const HomePage = () => {
  const { currentUser } = useContext(UserContext)
  console.log("HERE: ", currentUser.recommendations[0])

  const timelinePost = currentUser.recommendations.map(recommendation => {
    return (
      <TimelinePost
        recommenderAvatar={recommendation.recommender.avatarUrl}
        poster={recommendation.show.thumbnailUrl}
        title={recommendation.show.title}
        releaseYear={recommendation.show.releaseYear}
        rating={recommendation.show.rating}
        genres={recommendation.show.genres}
        date={recommendation.createdAt}
      />
    )
  })

  return (
    <div className="home-container">
      <h1 className="recommend-title">Recommended By Friends</h1>
      {timelinePost}
    </div>
  )
}

export default HomePage