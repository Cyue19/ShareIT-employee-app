import React, { Component } from 'react'
import firebase from 'firebase';
import ShowIf from "../../ShowIf";


export default class PasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            newOne: '',
            verify: ''
        }
    }
    onNewChanged(e) {
        this.setState({
            newOne: e.target.value
        })
    }

    onVerifyChanged(e) {
        this.setState({
            verify: e.target.value
        })
    }

    async saveChanges() {
        const { newOne, verify } = this.state; 
        if (!newOne) {
            this.setState({
                error: 'Please enter your new password.'
            });
            return; 
        } else if (!verify) {
            this.setState({
                error: 'Please verify your password.'
            });
            return; 
        } else if (newOne !== verify) {
            this.setState({
                error: 'Passwords do not match.'
            });
            return; 
        } else if (newOne.length < 6) {
            this.setState({
                error: 'Your password must be at least 6-character long.'
            });
            return; 
        }
        const user = firebase.auth().currentUser;
        user.updatePassword(newOne).then(() => {
            document.getElementById("success").innerHTML = 'Your password was successfully changed.';
            this.setState({
                error: ''
            });
        }).catch((err) => {
            this.setState({
                error: err
            });
            return; 
        });
    }
    
    render() {
        const error = this.state.error; 
        return (
            <div>
                <div className="modal fade" id="personalInfoModal" tabindex="-1" aria-labelledby="personalInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="personalInfoModalLabel">Reset Password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="row">
                                    <div className="mb-3">
                                        <label className="form-label">New Password:</label>
                                        <input onChange={(e) => this.onNewChanged(e)} type="password" className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Verify Password:</label>
                                        <input onChange={(e) => this.onVerifyChanged(e)} type="password" className="form-control"/>
                                    </div>
                                </form>
                            </div>
                            <p className="ms-3" style={{color: 'blue'}} id="success"></p>
                            <ShowIf isTrue={this.state.error}>
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </ShowIf>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.saveChanges()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

