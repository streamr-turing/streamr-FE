
import "./_DetailsFriendAvatar.scss"

const DetailsFriendAvatar = ({ username, avatarUrl }) => {
  
  return (
    <span className="details-avatar">
      <img
        className="details-avatar__img"
        src={avatarUrl}
      />
      <p>{username}</p>
    </span>
  )
}

export default DetailsFriendAvatar