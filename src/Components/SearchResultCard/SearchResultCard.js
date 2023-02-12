import { Link } from "react-router-dom"
import { useState } from "react"
import savedTrue from "../../images/bookmark-true.png"
import savedFalse from "../../images/bookmark-false.png"
import tv from '../../images/tv.png'
import './_SearchResultCard.scss'

const SearchResultCard = ({ poster, title, year }) => {
    const [isSaved, setIsSaved] = useState(false)
    const [hovering, setHover] = useState(false)

    const overlay =
        <div
            className="overlay"
            data-cy="overlay"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p className="overlay-text">{title} ({year.slice(0,4)})</p>
        </div>

    const imageClassList = hovering ?
        `hover-animation tile-img` :
        `tile-img`

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
            <img
                data-cy="bookmark-tile"
                className='bookmark bookmark-tile'
                src={isSaved ? savedTrue : savedFalse}
                alt="bookmark icon"
                onClick={toggleSaved}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            />
            <Link to="/show/4600"><div data-cy="img-container" className="img-container">
                <img
                    className={imageClassList}
                    src={poster ? poster : tv}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
                {hovering && overlay}
            </div></Link>
        </div>
    )
}

export default SearchResultCard