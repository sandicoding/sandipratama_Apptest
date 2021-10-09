import React, { Component } from "react"
import { BoxUpload, ImagePreview, Container } from "./style"
import FolderIcon from "../assets/folder_icon_transparent.png"
import CloseIcon from "../assets/CloseIcon.svg"

class MyForm extends Component {
    state = {
        form: { firstName: "", lastName: "", age: "", photo: "", isEdit: false },
        btnName: "Save",
        btnClass: "ui primary button submit-button",
        isUploaded: false,
        typeFile: "",
    }

    isEmptyObj(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmptyObj(this.props.customer)) {
            this.setState({
                form: { ...this.props.customer, isEdit: true, isUploaded: true },
                btnName: "Update",
                btnClass: "ui orange button submit-button",
            })
            // console.log("update");
        }
    }

    handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ typeFile: e.target.files[0].type })
            let reader = new FileReader()

            reader.onload = (e) => {
                this.setState({ form: { ...this.state.form, photo: e.target.result } })
                this.setState({ isUploaded: true })
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    onFormSubmit = (event) => {
        // prevent form submit
        event.preventDefault()

        // form validation
        if (this.formValidation()) {
            // send form data to app
            this.props.onFormSubmit(this.state.form)

            // change the button to save
            this.setState({
                btnName: "Save",
                btnClass: "ui primary button submit-button",
            })

            // clear form fields
            this.clearFormFields()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        let form = this.state.form
        form[name] = value
        this.setState({ form })
    }

    formValidation = () => {
        // first name
        if (document.getElementsByName("firstName")[0].value === "") {
            alert("Enter first name")
            return false
        }

        // last name
        if (document.getElementsByName("lastName")[0].value === "") {
            alert("Enter last name")
            return false
        }

        // age
        if (document.getElementsByName("age")[0].value === "") {
            alert("Enter age")
            return false
        }

        return true
    }

    clearFormFields = () => {
        // console.log("clear");
        // change form state
        this.setState({
            form: { firstName: "", lastName: "", age: "", photo: "", isEdit: false },
            isUploaded: false,
        })

        // clear form fields
        document.querySelector(".form").reset()
    }

    render() {
        // console.log(this.state.form)
        return (
            <div>
                <form className="ui form">
                    <div className="fields">
                        <div className="four wide field">
                            <label>First name</label>
                            <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} value={this.state.form.firstName} />
                        </div>

                        <div className="four wide field">
                            <label>Last name</label>
                            <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} value={this.state.form.lastName} />
                        </div>

                        <div className="six wide field">
                            <label>age</label>
                            <input type="number" name="age" onChange={this.handleChange} value={this.state.form.age} />
                        </div>

                        <div className="two wide field">
                            <button className={this.state.btnClass} onClick={this.onFormSubmit}>
                                {this.state.btnName}
                            </button>
                        </div>
                    </div>
                </form>
                <Container>
                    <BoxUpload>
                        <div className="image-upload">
                            {!this.state.isUploaded ? (
                                <div>
                                    <label htmlFor="upload-input">
                                        <img src={FolderIcon} draggable={"false"} alt="placeholder" style={{ width: 100, height: 100 }} />
                                        <p style={{ color: "#444" }}>Click to upload image</p>
                                    </label>

                                    <input hidden id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={this.handleImageChange} />
                                </div>
                            ) : (
                                <ImagePreview>
                                    <img
                                        className="close-icon"
                                        src={CloseIcon}
                                        alt="CloseIcon"
                                        onClick={() => {
                                            this.setState({ isUploaded: false })
                                            this.setState({ form: { photo: null } })
                                        }}
                                    />
                                    {this.state.typeFile.includes("video") ? <video id="uploaded-image" src={this.state.form.photo} draggable={false} controls autoPlay alt="uploaded-img" /> : <img id="uploaded-image" src={this.state.form.photo} draggable={false} alt="uploaded-img" />}
                                </ImagePreview>
                            )}
                        </div>
                    </BoxUpload>

                    {this.state.isUploaded ? <h2>Type is {this.state.typeFile}</h2> : null}
                </Container>
            </div>
        )
    }
}

export default MyForm
