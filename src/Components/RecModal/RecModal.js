import './_RecModal.scss'
import { useContext } from "react"
import { RecModalContext } from "../../Providers/RecModalContext"

const RecModal = () => {

    const  { changeModalState } = useContext(RecModalContext)

    const closeModal = () => {
        changeModalState(false)
      }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className='titleCloseBtn' onClick={()=> {
            closeModal()
          }}> X </button>
                <div className="title">
                    <h1>Recommend to friends!</h1>
                </div>
                <div className="body">
                    <p>Form Goes Here!</p>
                </div>
                <div className="footer">
                    <button>Send!</button>
                </div>
            </div>
        </div>
    )
}


export default RecModal