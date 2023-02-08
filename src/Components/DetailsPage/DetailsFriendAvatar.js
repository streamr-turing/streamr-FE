
import "./_DetailsFriendAvatar.scss"

const DetailsFriendAvatar = ({ username, avatarUrl }) => {
  
  return (
    <div className="details-avatar">
      <p>{username}</p>
      <img
        className="details-avatar__img"
        src={avatarUrl}
      />
    </div>
  )
}

export default DetailsFriendAvatar