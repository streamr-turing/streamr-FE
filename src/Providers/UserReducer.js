import UserTypes from "./UserTypes"

export const USER_INTIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case UserTypes.SET_USER:
      return {
        currentUser: {
          ...action.payload
        }
      }
    case UserTypes.ADD_TO_WATCHLIST:
      return {
        currentUser: {
          ...state.currentUser,
          watchlistItems: [
            ...state.currentUser.watchlistItems,
            action.payload
          ]
        }
      }
    case UserTypes.REMOVE_FROM_WATCHLIST:
      const filteredList = state.currentUser.watchlistItems.filter(item => {
        return item.show.tmdbId !== action.payload
      })
      return {
        currentUser: {
          ...state.currentUser,
          watchlistItems: filteredList
        }
      }
    default:
      return state
  }
}

export default userReducer