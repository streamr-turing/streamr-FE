import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {

  const streamingServiceIcons = data.streamingService.map(service => (
    <img
      className="details-table__provider-icon"
      alt={service.providerName}
      src={service.logoPath}
      key={service.providerName}
    />
  ))

  return (
    <table className="details-table">
      <tbody>
        {data.streamingService &&
          <tr>
            <td className="details-table__key">Streaming on:</td>
            <td className="details-table__providers">
              {streamingServiceIcons}
            </td>
          </tr>
        }
        <tr>
          <td className="details-table__key">Genres:</td>
          <td className="details-table__genres">{data.genres.join(", ")}</td>
        </tr>
        <tr>
          <td className="details-table__key">Audience Rating:</td>
          <td className="details-table__rating">{Math.round(data.rating)}/10 ⭐️</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DetailsTable