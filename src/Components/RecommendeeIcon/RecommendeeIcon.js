import './_RecommendeeIcon.scss'

const RecommendeeIcon = ({recommenderAvatar, recommenderName}) => {
    return(
        <div className="recommender-container">
            <img src={recommenderAvatar} className='recommender-avatar'/>
            <h1 className='recommender-name'>{recommenderName}</h1>
        </div>
    )
}

export default RecommendeeIcon