import React, { Component } from "react"
import Contact from "./Contact"

class ContactList extends Component {
    onDelete = (id) => {
        // console.log("customer list ", id);
        this.props.onDelete(id)
    }

    onEdit = (id) => {
        // console.log("customer list ", id);
        this.props.onEdit(id)
    }

    render() {
        const contacts = this.props.contacts
        return (
            // <div className="data">
            //     <table className="ui celled table">
            //         <thead>
            //             <tr>
            //                 <th style={{ width: "50px", textAlign: "center" }}>#</th>
            //                 <th>Photo</th>
            //                 <th>Name</th>
            //                 <th>age</th>
            //                 <th style={{ width: "148px" }}>Action</th>
            //             </tr>
            //         </thead>

            //         <tbody>
            //             {contacts?.map((customer, index) => {
            //                 return <Customer key={index + 1} no={index + 1} customer={customer} onDelete={this.onDelete} onEdit={this.onEdit} />
            //             })}
            //         </tbody>
            //     </table>
            // </div>

            <div className="ui cards">
                {contacts?.map((contact, index) => {
                    return <Contact key={index + 1} no={index + 1} contact={contact} onDelete={this.onDelete} onEdit={this.onEdit} />
                })}
            </div>
        )
    }
}

export default ContactList
