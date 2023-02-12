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
      return <td>Available on:</td>
    }
  }

  return (
    <table>
      <tbody>
        {data.streamingService &&
          <tr>
            {streamingServiceTitleResult()}
            <td>{streamingServiceDataResult()}</td>
          </tr>
        }
        <tr>
          <td>{data.genres.join(", ")}</td>
        </tr>
        <tr>
          <td>Audience Rating:</td>
          <td>{Math.round(data.rating)}/10</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DetailsTable