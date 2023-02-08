import { createContext, useReducer } from 'react'
import userReducer, { USER_INTIAL_STATE } from "./UserReducer"
import UserTypes from './UserTypes'

export const UserContext = createContext({ ...USER_INTIAL_STATE })

const UserProvider = ({ children }) => {
    const [store, dispatch] = useReducer(userReducer, USER_INTIAL_STATE)
    const { currentUser } = store

    const addToWatchList = (show) => {
        dispatch({
            type: UserTypes.ADD_TO_WATCHLIST,
            payload: show
        })
    }

    const removeFromWatchList = (showId) => {
        dispatch({
            type: UserTypes.REMOVE_FROM_WATCHLIST,
            payload: showId
        })
    }

    return (
        <UserContext.Provider value={
            { currentUser, addToWatchList, removeFromWatchList }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider