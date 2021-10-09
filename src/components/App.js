import React, { Component } from "react"
import axios from "axios"
import MyForm from "./MyForm"
import ContactList from "./ContactList"
import Loader from "./Loader"
import "./app.css"

import { connect } from "react-redux"
import { listContactAction, tambahContactAction, updateContactAction } from "../redux/actions/contactActions"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            loader: false,
            customer: {},
            url: "https://simple-contact-crud.herokuapp.com/contact",
        }
    }

    getCustomers = async () => {
        // this.setState({ loader: true })
        // const customers = await axios.get(this.state.url)
        const { listContactAction } = this.props
        listContactAction()
    }

    deleteCustomer = async (id) => {
        this.setState({ loader: true })

        await axios.delete(`${this.state.url}/${id}`).catch((e) => {
            // console.log(e.message);
            alert(e.response.status === 400 ? "Customer not found" : "")
        })

        this.getCustomers()
    }

    createCustomer = async (data) => {
        this.setState({ loader: true })
        const { tambahContactAction, listContactAction } = this.props
        const { firstName, lastName, age, photo } = data
        const list = {
            firstName,
            lastName,
            age,
            photo,
        }

        tambahContactAction(list)
        listContactAction()
    }

    editCustomer = async (data) => {
        // clear customer obj
        this.setState({ customer: {} })

        const { updateContactAction, listContactAction } = this.props
        const { id, firstName, lastName, age, photo } = data
        const list = {
            firstName,
            lastName,
            age,
            photo,
        }

        updateContactAction(list, id)
        listContactAction()
    }

    componentDidMount() {
        this.getCustomers()
    }

    onDelete = (id) => {
        // console.log("app ", id);
        this.deleteCustomer(id)
    }

    onEdit = (data) => {
        // console.log("app ", data);
        this.setState({ customer: data })
    }

    onFormSubmit = (data) => {
        // console.log("app ", data);
        // return;
        // console.log("app ", data);
        console.log(data)
        if (data.isEdit === true) {
            // if is edit true
            this.editCustomer(data)
        } else {
            // if is edit false
            this.createCustomer(data)
            // console.log(data)
        }
    }

    render() {
        const { contacts } = this.props

        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React JS CRUD Contact Created Sandi Pratama
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <MyForm onFormSubmit={this.onFormSubmit} customer={this.state.customer} />
                    {contacts.loading ? <Loader /> : ""}
                    <ContactList contacts={contacts.contacts} onDelete={this.onDelete} onEdit={this.onEdit} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ listContacts, tambahContact, updateContact }) => ({
    contacts: listContacts,
    contact: tambahContact,
    update: updateContact,
})

export default connect(mapStateToProps, { listContactAction, tambahContactAction, updateContactAction })(App)
