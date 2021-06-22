import React, { Component } from 'react'

import Firebase from "../firebase/Firebase";

import "./Register.css";

import img1 from '../img/shareit_logomarca_2021.png';

export default class Register extends Component {
    constructor(props) {
        super(props);
        
        this.auth = Firebase.instance().auth;
        this.db = Firebase.instance().db;
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
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

    onConfirmPasswordChanged(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    async createUser(e) {
        try {
            const { firstName, lastName, email, password, confirmPassword } = this.state; 
            if (firstName === '') {
                throw 'Please enter your first name.'
            } else if (lastName === '') {
                throw 'Please enter your last name.'
            } else if (password !== confirmPassword) {
                throw 'Passwords do not match.'
            }
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid; 
            const url = '/profile/' + userId;
            await this.db.collection('profiles').add({
                firstName: firstName,
                lastName: lastName,
                userId: userId,
                email: email 
            });
            this.props.history.push(url);
        } catch(err) {
            alert(err);
        }
    }

    render() {
        return (
            <div className="form-signin text-center" style={{background: "linear-gradient(to left, #3c817a, #19033d)", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div className="container mt-5 mb-5" style={{width: '484px', background: 'white', borderRadius: '20px'}}>
                 
                        <div className="text-center mt-5">
                            <img src={img1} alt="Logo" style={{width: '100px'}} className="mb-3"/>
                            <h1 className="unbold">Create your account</h1>
                            <p>Fill in all fields to register.</p>
                        </div>

                        <div className="form-card mb-5">
                            <form className="row">
                                <h2 className="unbold mb-3">Account Information</h2>
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
                                    <input onChange={(e) => this.onEmailChanged(e)} type="email" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Password</label>
                                    <input onChange={(e) => this.onPasswordChanged(e)} type="password" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Confirm Password</label>
                                    <input onChange={(e) => this.onConfirmPasswordChanged(e)} type="password" className="form-control"/>
                                </div>
                                <div className="text-center">
                                    <button type="button" onClick={() => this.createUser()} className="btn btn-primary sharp">Submit</button>
                                </div>
                            </form>
                        </div>
                    
                </div>
            </div>
        )
    }
}
