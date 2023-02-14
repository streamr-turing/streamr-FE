import { useContext } from "react"
import { UserContext } from "../../Providers/UserContext"
import { RecModalContext } from "../../Providers/RecModalContext"

import "./_DetailsReccInterface.scss"
import DetailsFriendAvatar from "./DetailsFriendAvatar"
import paperPlane from "../../images/paper-plane.png"

const DetailsReccInterface = ({ id }) => {
  const { currentUser } = useContext(UserContext)
  const { changeModalState, changeModalShow } = useContext(RecModalContext)

  const addlRecommendersMsg = <p className="addl-recommenders">and other friends</p>

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
    .reduce((acc, node) => {
      if (acc.length < 3) acc.push(node)
      else if (acc.length === 3) acc.push(addlRecommendersMsg)
      return acc
    }, [])

    const handleModalChange = () => {
      changeModalState(true)
      changeModalShow(+id)
    }

  return (
    <div 
      className="recc-container"
      data-cy="recc-container"
    >
      {!!friendAvatars.length && 
        <h2 className="recc-container__title">Recommended by Friends:</h2> 
      }
      <div className="recc-lower">
        <div 
          className="recc-lower__avatars-container"
          data-cy="avatars-container"
        >
          {friendAvatars}
        </div>
        <button
          className="recc-lower__button"
          onClick={handleModalChange}
          data-cy="open-modal"
        >
          <img src={paperPlane} alt='airplane icon'/>
        </button>
      </div>
    </div>
  )
}

export default DetailsReccInterface