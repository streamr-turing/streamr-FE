import './_RecModal.scss'
import { useContext, useState } from "react"
import { RecModalContext } from "../../Providers/RecModalContext"
import { AllUsersContext } from '../../Providers/AllUsersContext'
import { UserContext } from '../../Providers/UserContext'

import Friend from './Friend/Friend'
import { useMutation } from '@apollo/client'


const RecModal = () => {
    const  { changeModalState, changeModalShow } = useContext(RecModalContext)
    const { allUsers } = useContext(AllUsersContext)
    const { currentUser } = useContext(UserContext)
    const [sendList, setSendList] = useState([])
    // const [createRecommendation, { data }] = useMutation(POST_QUERY)

    const allFriends = allUsers.filter(user => user.userId !== currentUser.id)

    const friendList = allFriends.map(friend => {
        return(
            <Friend
            key={friend.userId}
            userid={friend.userId}
            username={friend.username}
            sendList={sendList}
            setSendList={setSendList}
            />
        )
    })

    const closeModal = () => {
        changeModalState(false)
        changeModalShow(0)
      }
    
    const handleSend = (event) => {
        event.preventDefault()
        
        // createRecommendation({})
        closeModal()
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className='titleCloseBtn' onClick={()=> {
            closeModal()
          }}> X </button>
                <form className="body">
                    <section className="friend-list">
                    { friendList.length ? friendList: <p>Add some friends!</p> }
                    </section>
                    <button onClick={handleSend}>Send!</button>
                </form>
            </div>
        </div>
    )
}


export default RecModal