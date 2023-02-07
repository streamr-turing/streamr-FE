import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import './_TimelinePost.scss'

const TimelinePost = () => {
    return (
        <div className="timeline-post-container">
            <h1>TimelinePost</h1>
            <RecommendeeCard />
            <RecommendeeIcon />
        </div>
    )
}

export default TimelinePost