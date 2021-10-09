/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react"

class Contact extends Component {
    onDelete = () => {
        this.props.onDelete(this.props.contact.id)
    }

    onEdit = () => {
        console.log("contact ", this.props.contact.id)
        this.props.onEdit(this.props.contact)
    }

    render() {
        const { firstName, lastName, age, photo } = this.props.contact

        return (
            <div className="card">
                <div className="content">
                    <img className="right floated mini ui image" src={photo === "N/A" ? "https://i.pravatar.cc/" + this.props.no : photo} />
                    <div className="header">{`${firstName} ${lastName}`}</div>
                    <div className="meta">age {`${age}`}</div>
                    <div className="description">Elliot requested permission to view your contact details</div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button" onClick={this.onEdit}>
                            Edit
                        </div>
                        <div className="ui basic red button" onClick={this.onDelete}>
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
