import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'

import TimelinePost from "../TimelinePost/TimelinePost"
import "./_HomePage.scss"

//////////// TO DO LIST ////////////
//1. Timeline segment logic
//1. Reposition timeline circle, line, and recommender avatar lower

const HomePage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("HERE: ", currentUser.recommendations[0])

  const sortedList = currentUser.recommendations.sort((a, b) => {
    a = a.createdAt.slice(0, 10).split('-').join('')
    b = b.createdAt.slice(0, 10).split('-').join('')
    return b - a
  })

  const timelinePost = sortedList.map(recommendation => {
    return (
      <TimelinePost
        recommenderAvatar={recommendation.recommender.avatarUrl}
        recommenderName={recommendation.recommender.username}
        poster={recommendation.show.thumbnailUrl}
        title={recommendation.show.title}
        releaseYear={recommendation.show.releaseYear}
        rating={recommendation.show.rating}
        genres={recommendation.show.genres}
        date={recommendation.createdAt}
        key={recommendation.id}
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