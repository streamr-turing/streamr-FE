import './_Error.scss'
import { BiError, BiServer } from 'react-icons/bi'
import fix from '../../images/fixingserver1.png'

const Error = () => {
    return (
        <div className="error">
        <BiError className="error-icon" />
        <BiServer className="error-icon" />
        <p className="message">Bummer! The server isn't responding. Our team is working on it! Come back later!</p>
        <img src={fix} alt='Legs of a person fixing a server sticking out of wires' />
        </div>
    )
}


export default Error