import './_RecommendeeCard.scss'

const RecommendeeCard = ({ poster, title, releaseYear, rating, genres, date }) => {
    const allGenres = genres.reduce((genreCategories, currentGenre) => {
        genreCategories += currentGenre
        if (currentGenre !== genres[genres.length - 1]) {
            genreCategories += " - "
        }
        return genreCategories
    }, "")

    const formatDate = () => {
        date = date.slice(0, 10).split('-')
        let day = parseInt(date[2])
        let month = parseInt(date[1])
        let year = date[0]
        switch (month) {
            case 1: month = "Jan"; break;
            case 2: month = "Feb"; break;
            case 3: month = "Mar"; break;
            case 4: month = "Apr"; break;
            case 5: month = "May"; break;
            case 6: month = "Jun"; break;
            case 7: month = "Jul"; break;
            case 8: month = "Aug"; break;
            case 9: month = "Sep"; break;
            case 10: month = "Oct"; break;
            case 11: month = "Nov"; break;
            case 12: month = "Dec"; break;
        }
        date = `${month} ${day} ${year}`
        return date
    }

    return (
        <div>
            <div className="recommendee-card-container">
                <img src={poster} className='poster-img' />
                <div className='recommendee-card-info'>
                    <h1>{title} ({releaseYear})</h1>
                    <h2>Audience Rating: {rating}/10</h2>
                    <h3>{allGenres}</h3>
                </div>
            </div>
            <h4 className='post-date'>{formatDate()}</h4>
        </div>
    )
}

export default RecommendeeCard