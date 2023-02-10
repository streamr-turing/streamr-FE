import "./_DetailsFriendAvatar.scss"

const DetailsFriendAvatar = ({ username, avatarUrl }) => {
  
  return (
    <div className="details-avatar">
      <img
        className="details-avatar__img"
        src={avatarUrl}
      />
      <p className="details-avatar__name">{username}</p>
    </div>
  )
}

export default DetailsFriendAvatar