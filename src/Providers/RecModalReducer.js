import RecModalTypes from "./RecModalTypes"

export const RECMODAL_INTIAL_STATE = {
    openModal: false
}

const RecModalReducer = (state, action) => {
    switch(action.type) {
        case RecModalTypes.CHANGE_MODAL_STATE:
            return {
                openModal: action.payload
            }

        default:
            return state
    }
}

export default RecModalReducer