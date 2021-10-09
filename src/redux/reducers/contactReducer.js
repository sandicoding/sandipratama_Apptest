import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_TAMBAH_FAIL, CONTACT_TAMBAH_REQUEST, CONTACT_TAMBAH_SUCCESS, CONTACT_UPDATE_FAIL, CONTACT_UPDATE_REQUEST, CONTACT_UPDATE_SUCCESS } from "../constanta/contactConstants"

export const contactListReducer = (state = { contacts: [] }, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return { loading: true, contacts: [] }
        case CONTACT_SUCCESS:
            return { loading: false, contacts: action.payload }
        case CONTACT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const tambahContactReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_TAMBAH_REQUEST:
            return { loading: true }
        case CONTACT_TAMBAH_SUCCESS:
            return { loading: false, success: true, contact: action.payload }
        case CONTACT_TAMBAH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateContactReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_UPDATE_REQUEST:
            return { loading: true }
        case CONTACT_UPDATE_SUCCESS:
            return { loading: false, success: true, contact: action.payload }
        case CONTACT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
