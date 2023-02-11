import './_Friend.scss'

const Friend = ({username, userid, sendList, setSendList}) => {

    const handleCheckboxChange = (event) => {
    const value = event.target.value
    if(sendList.includes(value)) {
        setSendList(sendList.filter(v => v !== value))
    } else {
        setSendList([...sendList, value])
    }

    }
    return (
        <div className='label-checkbox'>
        <label className='label'>
        {username}
        <input
            className='checkbox' 
            type='checkbox'
            id={userid}
            name={username}
            value={userid}
            onClick={handleCheckboxChange}
        />
        </label>
        </div>
    )
}

export default Friend