import { createContext, useReducer } from 'react'
import { ALL_USERS_INITIAL_STATE } from './AllUsersReducer'
import userReducer from './UserReducer'

export const AllUsersContext = createContext({...ALL_USERS_INITIAL_STATE })

const AllUsersProvider = ({ children }) => {
    const [store] = userReducer(userReducer, ALL_USERS_INITIAL_STATE)
    const { allUsers } = store
    return (
        <AllUsersContext.Provider value={ { allUsers } }>
            {children}
        </AllUsersContext.Provider>
    )
}


export default AllUsersProvider