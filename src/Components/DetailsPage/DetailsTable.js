import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {

  const providerIcons = data.streamingService.map(provider => (
    <img
      className="details-table__provider-icon"
      alt={provider.providerName}
      src={provider.logoPath}
      key={provider.providerName}
    />
  ))

  return (
    <table className="details-table">
      <tbody>
        {!!data.streamingService.length &&
          <tr>
            <td className="details-table__key">Streaming on:</td>
            <td 
              className="details-table__providers"
              data-cy="provider-icons"
            >
              {providerIcons}
            </td>
          </tr>
        }
        <tr>
          <td className="details-table__key">Genres:</td>
          <td 
            className="details-table__genres"
            data-cy="genres"
          >{data.genres.join(", ")}</td>
        </tr>
        <tr>
          <td className="details-table__key">Audience Rating:</td>
          <td 
            className="details-table__rating"
            data-cy="rating"
          >{Math.round(data.rating)}/10 ⭐️</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DetailsTable