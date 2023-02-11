import './_RecModal.scss'
import { useContext, useState, useEffect } from "react"
import { RecModalContext } from "../../Providers/RecModalContext"
import { UserContext } from '../../Providers/UserContext'

import Friend from './Friend/Friend'
import { useQuery, useMutation } from '@apollo/client'

import { GET_ALL_USERS } from '../../GraphQL/Queries'

const RecModal = () => {
    const  { changeModalState, changeModalShow } = useContext(RecModalContext)
    const { currentUser } = useContext(UserContext)
    const [sendList, setSendList] = useState([])
    const [allFriendsList, setAllFriendsList] = useState([])

    const { error, loading, data } = useQuery(GET_ALL_USERS)

    useEffect(() => {
        if(data) {
            console.log('data', data.users)
            setAllFriendsList(getFriendsList())

        }
    }, [data])

    const getFriendsList = () => {
        return data.users.filter(user => user.Id !== currentUser.id)
    }

    const friendList = allFriendsList.map(friend => {
        console.log('friend', friend)
        return(
            <Friend
            key={friend.id}
            userid={friend.id}
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
        // console.log('currentModal', currentModal)
        // console.log('sendList', sendList)
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