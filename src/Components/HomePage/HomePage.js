import TimelinePost from "../TimelinePost/TimelinePost"
import "./_HomePage.scss"

const HomePage = () => {

  return (
    <div className="home-container">
      <h1 className="recommend-title">Recommended By Friends</h1>
      <TimelinePost/>
    </div>
  )
}

export default HomePage