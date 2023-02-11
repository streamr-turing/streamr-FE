import { createContext, useReducer } from 'react'
import userReducer, { RECMODAL_INTIAL_STATE } from "./RecModalReducer"
import RecModalTypes from './RecModalTypes'

export const RecModalContext = createContext({...RECMODAL_INTIAL_STATE})

const RecModalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(userReducer, RECMODAL_INTIAL_STATE)
  const { currentModal } = store

const changeModalState = (modalState) => {
    dispatch({
        type: RecModalTypes.CHANGE_MODAL_STATE,
        payload: modalState
    })
}

const changeModalShow = (showId) => {
  dispatch({
    type: RecModalTypes.CHANGE_MODAL_SHOW,
    payload: showId
    //make sure that showId is a number
  })
}


  return (
    <RecModalContext.Provider value={{
      currentModal,
      changeModalState,
      changeModalShow
    }}>
      {children}
    </RecModalContext.Provider>
  )
}

export default RecModalProvider