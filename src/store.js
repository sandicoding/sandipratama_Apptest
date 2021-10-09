import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { contactListReducer, tambahContactReducer, updateContactReducer } from "./redux/reducers/contactReducer"

const reducer = combineReducers({
    listContacts: contactListReducer,
    tambahContact: tambahContactReducer,
    updateContact: updateContactReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
