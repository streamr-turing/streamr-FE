import './_RecModal.scss'
import { useContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { RecModalContext } from "../../Providers/RecModalContext"
import { UserContext } from '../../Providers/UserContext'
import Error from '../Error/Error'

import Friend from './Friend/Friend'
import { useQuery, useMutation } from '@apollo/client'

import { GET_ALL_USERS } from '../../GraphQL/Queries'
import { SEND_RECOMMENDATION } from '../../GraphQL/Mutations'

import Loading from '../Loading/Loading'

const RecModal = () => {
    const  { changeModalState, changeModalShow, currentModal } = useContext(RecModalContext)
    const { currentUser } = useContext(UserContext)
    const [sendList, setSendList] = useState([])
    const [allFriendsList, setAllFriendsList] = useState([])
    const [sentStatus, setSentStatus] = useState('waiting')
    const [createRecommendation] = useMutation(SEND_RECOMMENDATION)
    const { error, loading, data } = useQuery(GET_ALL_USERS, {fetchPolicy: 'network-only'})
    const navigate = useNavigate()

    useEffect(() => {
        if(data) {
            const getFriendsList = () => {
                return data.users.filter(user => user.id !== currentUser.id)
            }
            
            setAllFriendsList(getFriendsList())

        }
 
    }, [data])


    const friendList = allFriendsList.map(friend => {
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
        setSentStatus('waiting')
      }
    
    const handleSend = (event) => {
        event.preventDefault()
        const recommendedPostList = sendList.map(friendId => 
            ( {
                tmdbId: currentModal.tmdbId,
                recommenderId: +currentUser.id,
                recommendeeId: +friendId,
                mediaType: "tv"
            })
        )
        recommendedPostList.forEach(recommendation => {
            submitRec(recommendation)
        })
    }

    const submitRec = async (recommendation) => {
        try {
            const sendResult = await createRecommendation({ variables: recommendation })
            if(sendResult.data?.createRecommendation) {
                setSentStatus('sent')
                setTimeout(closeModal, 1000)
            }
        } catch (error) {
            console.log(error)
            setSentStatus('failed')
            setTimeout(closeModal, 1500)
        }
    }

    if (loading) return <Loading/>
    if (error) {
      console.log(error)
      navigate("/error", { replace: true }) 
    }
    if(sentStatus === 'waiting') {
        return(
            <div className="modalBackground">
            <div className="modalContainer">
                <button className='titleCloseBtn' onClick={closeModal}> X </button>
                 {data ?
                    <form className="body">
                        <section className="friend-list">
                        { friendList.length ? friendList: <p>Add some friends!</p> }
                        </section>
                        <button onClick={handleSend}>Send!</button>
                    </form>
                    : <Error />
                }
            </div>
        </div>
        )
    } else if (sentStatus === 'sent') {
        return (
            <div className="modalBackground">
            <div className="sent-container">
                <p className='sent-text'>Sent!</p>
            </div>
        </div>
        )
    } else if (sentStatus === 'failed') {
        return (
            <div className="modalBackground">
                <div className="failed-container">
                <p className='failed-text'>Failed to send. Try again later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className='titleCloseBtn' onClick={()=> {
            closeModal()
          }}> X </button>
                 {data ?
                    <form className="body">
                        <section className="friend-list">
                        { friendList.length ? friendList: <p>Add some friends!</p> }
                        </section>
                        <button onClick={handleSend}>Send!</button>
                    </form>
                    : <Error />
                }
            </div>
        </div>
    )
}


export default RecModal