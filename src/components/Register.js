import React, { Component } from 'react'

import Profile from "../models/Profile";

import Firebase from "../firebase/Firebase";

import "./Register.css";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.auth = Firebase.getInstance().auth;
        this.db = Firebase.getInstance().db;
        this.storage = Firebase.getInstance().storage;
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }

    onFirstNameChanged(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onLastNameChanged(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value
        })
    }

    async createUserAndProfile() {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
            const picUrl = await this.storage.ref().child("images/default_profile_pic.jpg").getDownloadURL();
            const profile = new Profile(this.state.firstName, this.state.lastName, picUrl);
            profile.UserId = userCredential.user.uid;

            await this.db.collection("profiles").add({
                userId: profile.UserId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                picture: profile.picture,
                contact: profile.contact
            });

            this.props.history.push("/profile/" + profile.UserId);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="background">
                <div className="container card" style={{width: "55%", borderRadius: "15px"}}>
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="unbold">Create your account</h1>
                            <p>Fill in all fields to get started</p>
                        </div>

                        <div className="form-card mb-3">
                            <form className="row">
                                <h2 className="unbold">Account Information</h2>
                                <div className="col-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input onChange={(e) => this.onFirstNameChanged(e)} type="text" className="form-control"/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input onChange={(e) => this.onLastNameChanged(e)} type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input  onChange={(e) => this.onEmailChanged(e)} type="email" className="form-control" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Password</label>
                                    <input onChange={(e) => this.onPasswordChanged(e)} type="password" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                                <div className="text-center">
                                    <button type="button" onClick={() => this.createUserAndProfile()} className="btn btn-primary sharp">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
