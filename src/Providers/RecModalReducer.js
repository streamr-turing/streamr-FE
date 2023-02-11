import RecModalTypes from "./RecModalTypes"

export const RECMODAL_INTIAL_STATE = {
    currentModal: {
    openModal: false,
    tmdbId: 0
}}

const RecModalReducer = (state, action) => {
    switch(action.type) {
        case RecModalTypes.CHANGE_MODAL_STATE:
            return {
               currentModal: {
                ...state.currentModal,                
                openModal: action.payload
                }
            }
        case RecModalTypes.CHANGE_MODAL_SHOW:
            return {
                currentModal: {
                    ...state.currentModal,
                    tmbId: action.payload
                }
            }
        default:
            return state
    }
}

export default RecModalReducer