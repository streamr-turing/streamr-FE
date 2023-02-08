import "./_DetailsPage.scss"

const DetailsTable = ({ data }) => {
  
  return (
    <table>
      <tbody>
        { data.streamingService && 
          <tr>
            <td>Available on:</td>
            <td>netflix</td>
          </tr>
        }
        <tr>
          <td>{data.genres.join(", ")}</td>
        </tr>
        <tr>
          <td>Audience Rating:</td>
          <td>{data.rating}/10</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DetailsTable