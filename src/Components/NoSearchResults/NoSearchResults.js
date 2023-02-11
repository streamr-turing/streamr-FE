import './_NoSearchResults.scss'
import television from "../../images/television.png"

const NoSearchResults = () => {
    return (
        <div className='no-search-container'>
            <img src={television} className='shrug-img'/>
            <h2>No search results</h2>
        </div>
    )
}

export default NoSearchResults