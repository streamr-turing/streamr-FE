import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {
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
    </div>
  )
}

export default DetailsTable