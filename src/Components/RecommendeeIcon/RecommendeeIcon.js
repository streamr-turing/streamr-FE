import './_RecommendeeIcon.scss'

const RecommendeeIcon = ({recommenderAvatar}) => {
    return(
        <div>
            <img src={recommenderAvatar} className='recommender-avatar'/>
        </div>
    )
}

export default RecommendeeIcon