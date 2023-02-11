import './_Friend.scss'
import { useState } from 'react'

const Friend = ({username, userid, sendList, setSendList}) => {
    const [checked, setChecked] = useState(true)

    const toggleCheck = () => {
        console.log('checkedA', checked)
        setChecked(!checked)
        console.log('checkedB', checked)
        let userInfo = {
            username: username,
            userId: userid
        }
        if(checked) {
            const pushedSendList = sendList.push(userInfo)
            setSendList(pushedSendList)
        } else {
            console.log('sendList', sendList)
            const trueSendList = sendList.filter(sendListUser => {
                console.log('sendListUser', sendListUser)
                console.log('userInfo', userInfo)
                return sendListUser.userId !== userInfo.userId} )
            console.log('trueSendList', trueSendList)
            setSendList(trueSendList)
        }
        console.log('sendList', sendList)
    }

    return (
        <div>
        <label className='label'>
        {username}
        <input 
            type='checkbox'
            userid={userid}
            username='friend'
            value={userid}
            onClick={toggleCheck}
        />
        </label>
        </div>
    )
}

export default Friend