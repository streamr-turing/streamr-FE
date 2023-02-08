import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import './_TimelinePost.scss'

const TimelinePost = ({ recommenderAvatar, poster, title, releaseYear, rating, genres }) => {
    return (
        <div className="timeline-post-container">
            <RecommendeeIcon recommenderAvatar={recommenderAvatar}/>
            <div className="timeline-segment">
                <div className="timeline-tail"></div>
                <div className="timeline-circle"></div>
                <div className="timeline-tail"></div>
            </div>
            <RecommendeeCard poster={poster} title={title} releaseYear={releaseYear} rating={rating} genres={genres}/>
        </div>
    )
}

export default TimelinePost