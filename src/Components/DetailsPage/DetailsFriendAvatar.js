import "./_DetailsFriendAvatar.scss"

const DetailsFriendAvatar = ({ username, avatarUrl }) => {
  
  return (
    <div 
      className="details-avatar"
      data-cy="avatar-container"
    >
      <img
        className="details-avatar__img"
        alt={`avatar for ${username}`}
        src={avatarUrl}
      />
      <p className="details-avatar__name">
        {username}
      </p>
    </div>
  )
}

export default DetailsFriendAvatar