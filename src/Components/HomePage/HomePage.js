import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'
import NoRecommendations from '../NoRecommendations/NoRecommendations'

import TimelinePost from "../TimelinePost/TimelinePost"
import "./_HomePage.scss"

const HomePage = () => {
  const { currentUser } = useContext(UserContext)
  // console.log("HERE: ", currentUser.recommendations)
  
  const feedResult = () => {
    if (currentUser.recommendations.length) {
      const sortedList = currentUser.recommendations.sort((a, b) => {
        a = a.createdAt.slice(0, 10).split('-').join('')
        b = b.createdAt.slice(0, 10).split('-').join('')
        return b - a
      })
      const timelinePost = sortedList.map(recommendation => {
        let segmentStatus = false
        if (recommendation !== sortedList[sortedList.length - 1]) {
          segmentStatus = true
        }
        else (
          segmentStatus = false
        )
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
            drawSegment={segmentStatus}
          />
        )
      })
      return (
        <div className='timeline-container'>
            {timelinePost}
            <h3 className='end-of-feed-message'>End of feed</h3>
          </div>
        )
    }
    else {
      return <NoRecommendations />
    }
  }


  return (
    <div className="home-container">
      <h1 className="recommend-title">Recommended By Friends</h1>
      {feedResult()}
    </div>
  )
}

export default HomePage