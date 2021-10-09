import axios from "axios"
import { CONTACT_DELETE_FAIL, CONTACT_DELETE_REQUEST, CONTACT_DELETE_SUCCESS, CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_TAMBAH_FAIL, CONTACT_TAMBAH_REQUEST, CONTACT_TAMBAH_SUCCESS, CONTACT_UPDATE_FAIL, CONTACT_UPDATE_REQUEST, CONTACT_UPDATE_SUCCESS } from "../constanta/contactConstants"

export const listContactAction = () => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_REQUEST })

        const { data } = await axios.get("https://simple-contact-crud.herokuapp.com/contact")
        dispatch({
            type: CONTACT_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        dispatch({
            type: CONTACT_FAIL,
            payload: error.response && error.response.contacts.message ? error.response.contacts.message : error.message,
        })
    }
}
export const tambahContactAction = (DataContact) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_TAMBAH_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(`https://simple-contact-crud.herokuapp.com/contact`, DataContact, config)

        dispatch(listContactAction())
        dispatch({
            type: CONTACT_TAMBAH_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: CONTACT_TAMBAH_FAIL,
            payload: error.response && error.response.message ? error.response.message : error.message,
        })
    }
}

export const updateContactAction = (DataContact, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_UPDATE_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(`https://simple-contact-crud.herokuapp.com/contact/${id}`, DataContact, config)

        dispatch(listContactAction())
        dispatch({
            type: CONTACT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: CONTACT_UPDATE_FAIL,
            payload: error.response && error.response.message ? error.response.message : error.message,
        })
    }
}

export const deleteContactAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_DELETE_REQUEST })

        const { data } = await axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        dispatch({
            type: CONTACT_DELETE_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        dispatch({
            type: CONTACT_DELETE_FAIL,
            payload: error.response && error.response.contacts.message ? error.response.contacts.message : error.message,
        })
    }
}
