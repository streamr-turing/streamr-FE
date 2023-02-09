import { useContext } from "react"

import { UserContext } from "../../Providers/UserContext"
import "./_DetailsPage.scss"
import DetailsFriendAvatar from "./DetailsFriendAvatar"

const DetailsReccInterface = ({ id, showModal }) => {
  const {
    currentUser
  } = useContext(UserContext)

  const friendAvatars = currentUser.recommendations
    .reduce((acc, recc) => {
      const isDuplicateRecc = acc.some(accRecc => accRecc.recommender.id === recc.recommender.id)
      if (recc.show.tmdbId === id && !isDuplicateRecc) {
        acc.push(recc)
      }
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
      <h2>Reccomended by Friends:</h2>
      <div className="recc-lower">
        {friendAvatars}
      </div>
    </div>
  )
}

export default DetailsReccInterface