import './_RecModal.scss'

const RecModal = () => {

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button> X </button>
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