import RecommendeeCard from "../RecommendeeCard/RecommendeeCard"
import RecommendeeIcon from "../RecommendeeIcon/RecommendeeIcon"
import './_TimelinePost.scss'

const TimelinePost = ({ recommenderAvatar, recommenderName, poster, title, releaseYear, rating, genres, date }) => {
    return (
        <div className="timeline-post-container">
            <RecommendeeIcon recommenderAvatar={recommenderAvatar} recommenderName={recommenderName}/>
            <div className="timeline-segment">
                {/* <div className="timeline-tail"></div> */}
                <div className="timeline-circle"></div>
            </div>
            <RecommendeeCard
                poster={poster}
                title={title}
                releaseYear={releaseYear}
                rating={rating}
                genres={genres} 
                date={date}
            />
        </div>
    )
}

export default TimelinePost