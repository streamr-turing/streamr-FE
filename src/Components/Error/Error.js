import './_Error.scss'
import { BiError, BiServer } from 'react-icons/bi'


const Error = () => {
    return (
        <div className="error">
        <BiError className="error-icon" />
        <BiServer className="error-icon" />
        <p className="oops">Bummer! The server isn't responding.</p> 
        <p className="message">Our team is working on it! Come back later!</p>
        </div>
    )
}


export default Error