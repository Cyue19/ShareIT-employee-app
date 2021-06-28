import React, { Component } from 'react'
import PasswordModal from './PasswordModal';


export default class ResetPassword extends Component {
    render() {
        
        const { profile } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative", boxShadowTop: "none"}}>
                <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#personalInfoModal">
                    Edit
                </button>                
                <h3 className="info-header mx-4 col">Reset Password</h3>
                <div className="mx-4 mb-2">
                    <hr className="profile-hr"/>
                    <p>Password: *********</p>
                </div>
                

                <PasswordModal profile={profile} update={(profile) => this.props.update(profile)}/>
            </div>
        )
    }
}
