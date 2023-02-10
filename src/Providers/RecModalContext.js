import { createContext, useReducer } from 'react'
import userReducer, { RECMODAL_INTIAL_STATE } from "./RecModalReducer"
import RecModalTypes from './RecModalTypes'

export const RecModalContext = createContext({...RECMODAL_INTIAL_STATE})

const RecModalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(userReducer, RECMODAL_INTIAL_STATE)
  const { openModal } = store

const changeModalState = (modalState) => {
    dispatch({
        type: RecModalTypes.CHANGE_MODAL_STATE,
        payload: modalState
    })
}

  return (
    <RecModalContext.Provider value={{
      openModal,
      changeModalState
    }}>
      {children}
    </RecModalContext.Provider>
  )
}

export default RecModalProvider