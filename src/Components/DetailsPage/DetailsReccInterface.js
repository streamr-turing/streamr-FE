import { useContext } from "react"
import { UserContext } from "../../Providers/UserContext"

import "./_DetailsReccInterface.scss"
import DetailsFriendAvatar from "./DetailsFriendAvatar"

import sendImg from "../../images/send-recc.png"

const DetailsReccInterface = ({ id }) => {
  const { currentUser } = useContext(UserContext)

  const friendAvatars = currentUser.recommendations
    .reduce((acc, recc) => {
      const isDuplicateRecc = acc.some(accRecc => accRecc.recommender.id === recc.recommender.id)
      if (recc.show.tmdbId === id && !isDuplicateRecc) acc.push(recc)
      return acc
    }, [])
    .map(recc => (
      <DetailsFriendAvatar
        username={recc.recommender.username}
        avatarUrl={recc.recommender.avatarUrl}
        key={recc.recommender.id}
      />
    ))

  return (
    <div className="recc-container">
      {!!friendAvatars.length && 
        <h2 className="recc-container__title">Recommended by Friends:</h2> 
      }
      <div className="recc-lower">
        <div className="recc-lower__avatars-container">
          {friendAvatars}
        </div>
        <button
          className="recc-lower__button"
        >
          <img
            className="recc-lower__button__img"
            src={sendImg} 
            alt="send new recommendation" 
          />
        </button>
      </div>
    </div>
  )
}

export default DetailsReccInterface