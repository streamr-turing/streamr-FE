import './_RecommendeeCard.scss'

const RecommendeeCard = ({ poster, title, releaseYear, rating, genres }) => {
    const allGenres = genres.map(genre => {
        return genre + " "
    })

    return (
        <div className="recommendee-card-container">
            <img src={poster} className='poster-img' />
            <div className='recommendee-card-info'>
                <h1>{title} ({releaseYear})</h1>
                <h2>{rating}/10</h2>
                <h3>{allGenres}</h3>
            </div>
        </div>
    )
}

export default RecommendeeCard