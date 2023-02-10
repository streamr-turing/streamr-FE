import './_NoWatchListItems.scss'
import television from "../../images/television.png"

const NoWatchListItems = () => {

    return (
        <div className='no-recommendations-container'>
            <img src={television} className='shrug-img'/>
            <h2>No saved items </h2>
        </div>
    )
}

export default NoWatchListItems