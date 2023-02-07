import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import './_TimelinePost.scss'

const TimelinePost = () => {
    return (
        <div className="timeline-post-container">
            <RecommendeeIcon />
            <div className="timeline-circle"></div>
            <RecommendeeCard />
        </div>
    )
}

export default TimelinePost