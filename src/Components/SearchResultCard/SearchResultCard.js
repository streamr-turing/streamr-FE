import { useState } from "react"
import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"
import './_SearchResultCard.scss'

const SearchResultCard = ({ poster, title, year }) => {
    const [isSaved, setIsSaved] = useState(false)

    ///////////SAM VERSION START//////
    const [hovering, setHover] = useState(false)

    const overlay =
        <div
            className="overlay"
            data-cy="overlay"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p className="overlay-text">{title} ({year})</p>
        </div>

    const imageClassList = hovering ?
        `hover-animation tile-img` :
        `tile-img`
    ////////////SAM VERSION END///////////////

    const toggleSaved = () => {
        if (!isSaved) {
            setIsSaved(true)
        }
        else {
            setIsSaved(false)
        }
    }

    return (
        <div>
            {/* KIKO VERSION */}
            {/* <img src={isSaved ? savedTrue : savedFalse} className='search-bookmark' onClick={toggleSaved} />
            <img src={poster} className='search-posters'/> */}

            {/* SAM VERSION */}
            <img
                data-cy="bookmark-tile"
                className='bookmark bookmark-tile'
                src={isSaved ? savedTrue : savedFalse}
                alt="bookmark icon"
                onClick={toggleSaved}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            />
            <div data-cy="img-container" className="img-container">
                <img
                    className={imageClassList}
                    src={poster}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
                {hovering && overlay}
            </div>
        </div>
    )
}

export default SearchResultCard