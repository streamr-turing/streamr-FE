import "./_DetailsFriendAvatar.scss"

const DetailsFriendAvatar = ({ username, avatarUrl }) => {
  
  return (
    <div className="details-avatar">
      <img
        className="details-avatar__img"
        alt={`profile picture for ${username}`}
        src={avatarUrl}
      />
      <p className="details-avatar__name">
        {username}
      </p>
    </div>
  )
}

export default DetailsFriendAvatar