//recommendee-icon
//recommendee-card
//timeline-point (recommendee-icon + recomendee-card)

import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import "./_HomePage.scss"

const HomePage = () => {

  return (
    <div className="home-container">
      <h1 className="recommend-title">Recommended By Friends</h1>
      <RecommendeeCard/>
      <RecommendeeIcon/>
    </div>
  )
}

export default HomePage