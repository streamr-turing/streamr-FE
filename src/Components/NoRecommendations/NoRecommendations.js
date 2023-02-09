import './_NoRecommendations.scss'
import shrug from "../../images/shrug.png"

const NoRecommendations = () => {

    return (
        <div className='no-recommendations-container'>
            <img src={shrug} className='shrug-img'/>
            <h2>No recommendations today. Try again later</h2>
        </div>
    )
}

export default NoRecommendations