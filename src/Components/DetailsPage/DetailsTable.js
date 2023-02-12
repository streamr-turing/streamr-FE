import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {

  console.log('hello papa: ', data.recommendedBy)

  const streamingServiceDataResult = () => {
    if (data.streamingService.length) {
      const providerNames = data.streamingService.map(service => {
        return <img src={service.logoPath} className='provider-icons' />
      })
      return providerNames
    }
  }

  const streamingServiceTitleResult = () => {
    if (data.streamingService.length) {
      return <div className="detail-available-title">Streaming on:</div>
    }
  }

  const recommendedDataResult = () => {
    if (data.recommendedBy.length) {
      const friendNames = data.recommendedBy.map(friend => {
        return (
          <div className="detail-recommender-and-avatar-container">
            <img src={friend.avatarUrl} className='detail-recommender-avatar'/>
            <p className="detail-recommender-username">{friend.username}</p>
          </div>
        )
      })
      return friendNames
    }
  }

  const recommendedDataTitle = () => {
    if(data.recommendedBy.length) {
      return <p className="detail-recommended-by-friends-text">Recommended By Friends:</p>
    }
  }

  return (
    <div className="detail-mini-data-container">
      <div className="stream-rating-container">
        {streamingServiceTitleResult()}
        <div className="stream-icon-container">
          {streamingServiceDataResult()}
        </div>
      </div>
      <p>Audience Rating: {Math.round(data.rating)}/10 ⭐️</p>
      <p className="detail-genre-data">Genre: <b>{data.genres.join(", ")}</b></p>
      <p className="detail-summary-data">{data.summary}</p>
      <div className="detail-recommend-data">
        {recommendedDataTitle()}
        <div className="detail-recommender-data">{recommendedDataResult()}</div>
      </div>
    </div>
  )
}

export default DetailsTable