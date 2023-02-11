import './_Friend.scss'
import { useState } from 'react'

const Friend = ({username, userid, sendList, setSendList}) => {

    const handleCheckboxChange = (event) => {
        console.log('event.target.value', event.target.value)
    const value = event.target.value
    if(sendList.includes(value)) {
        setSendList(sendList.filter(v => v !== value))
    } else {
        setSendList([...sendList, value])
    }

    }
    return (
        <div>
        <label className='label'>
        {username}
        <input 
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