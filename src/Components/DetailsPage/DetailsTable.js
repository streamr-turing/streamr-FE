import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {

  const streamingServiceIcons = data.streamingService.map(service => (
    <img
      className="provider-icon"
      src={service.logoPath}
      key={service.providerName}
    />
  ))

  return (
    <table className="details-table">
      <tbody>
        {data.streamingService &&
          <tr>
            <td>Streaming on:</td>
            <td>
              <div className="stream-icon-container">
                {streamingServiceIcons}
              </div>
            </td>
          </tr>
        }
        <tr>
          <td>Genres:</td>
          <td>{data.genres.join(", ")}</td>
        </tr>
        <tr>
          <td>Audience Rating:</td>
          <td>{Math.round(data.rating)}/10 ⭐️</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DetailsTable