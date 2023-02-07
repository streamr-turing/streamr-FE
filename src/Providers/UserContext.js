import { createContext, useReducer } from 'react'
import userReducer, { USER_INTIAL_STATE } from "./UserReducer"

export const UserContext = createContext({ ...USER_INTIAL_STATE })

const UserProvider = ({ children }) => {
    const [store, dispatch] = useReducer(userReducer, USER_INTIAL_STATE)
    const { currentUser } = store

    return (
        <UserContext.Provider value={
            { currentUser }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider