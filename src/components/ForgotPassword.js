import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Firebase from "../firebase/Firebase";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;
        this.state = {
            email: ''
        }
    }
    
    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        })
    }

    async confirm(e) {
        e.preventDefault();
        const snapshot = await this.db.collection('profiles').where('email', '==', this.state.email).get();
        if (this.state.email === '') {
            alert("Please enter your email address.")
        } else if (snapshot.docs.length !== 1) {
            document.getElementById('confirm').innerHTML = "There is no account registered with the input email."
        } else {
            document.getElementById('confirm').innerHTML = "A temporary passcode has been sent to your email address."
        }
    }
    
    render() {
        return (
            <div className="form-signin text-center" style={{height: '100%', background: "linear-gradient(to left, #3c817a, #19033d)", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <form style={{width: '500px', background: 'white', borderRadius: '20px'}} onSubmit={(e) => this.confirm(e)}>
                    <div className="p-5">
                        <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
                        <div className="form-floating">
                            <input 
                                type="email" 
                                onChange={(e) => this.onEmailChanged(e)}
                                className="form-control" 
                                value={this.state.email}
                                placeholder="Email"/>
                            <label>Email address</label>
                        </div>
                        <div className="mt-3">
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                        </div>
                        <p id="confirm" className="mt-3" style={{color: 'blue'}}></p>
                        <div className="mt-5">
                            <span className="me-2">Don't have an account?</span>
                            <Link style={{textDecoration: 'none'}} to="/register">Register</Link>
                        </div>
                        <div className="mt-1">
                            <span className="me-2">Go back to log in:</span>
                            <Link style={{textDecoration: 'none'}} to="/login">Log In</Link>
                        </div>
                    </div>
                </form>                    
            </div>
        )
    }
}
