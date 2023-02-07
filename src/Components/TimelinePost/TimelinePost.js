import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import './_TimelinePost.scss'

const TimelinePost = () => {
    return (
        <div className="timeline-post-container">
            <RecommendeeIcon />
            <div className="timeline-segment">
            <div className="timeline-tail"></div>
            <div className="timeline-circle"></div>
            <div className="timeline-tail"></div>
            </div>
            <RecommendeeCard />
        </div>
    )
}

export default TimelinePost