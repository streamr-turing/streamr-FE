import { useContext } from "react"

import { UserContext } from "../../Providers/UserContext"
import "./_DetailsPage.scss"
import DetailsFriendAvatar from "./DetailsFriendAvatar"

const DetailsReccInterface = ({ id, showModal }) => {
  const { 
    currentUser
  } = useContext(UserContext)

  const friendAvatars = currentUser.recommendations
    .filter(recc => recc.show.tmdbId === id)
    .reduce((acc, recc) => {
      if (!acc.some(accRec => accRec.recommender.id === recc.recommender.id)) {
        acc.push(<DetailsFriendAvatar 
            username={recc.recommender.username}
            avatarUrl={recc.recommender.avatarUrl}
            key={recc.recommender.id}
          />)
      }
      return acc
    }, [])

  return (
    <div className="recc-container">
      <h2>Reccomended by Friends:</h2>
      <div className="recc-lower">
        {friendAvatars}
      </div>
    </div>
  )
}

export default DetailsReccInterface