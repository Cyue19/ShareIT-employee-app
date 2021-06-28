import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import AccountEditModal from "./AccountEditModal";

export default class Account extends Component {

    // onAccessEmailChanged(e) {
    //     this.props.profile.accessEmail = e.target.value;
    // }

    // onPermissionsChanged(e) {
    //     this.props.profile.permissions = e.target.value;
    //     this.setState({});
    // }

    // onStatusChanged(e) {
    //     this.props.profile.status = e.target.value;
    //     this.setState({});
    // }

    // onLanguageChanged(e) {
    //     this.props.profile.language = e.target.value;
    //     this.setState({});
    // }

    // saveChanges() {
    //     this.props.update(this.props.profile);
    //     this.setState({});
    // }

    render() {
        const {profile, permissions} = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%"}}>
                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#accountModal">
                    Edit
                    </button>
                </ShowIf>

                <h3 className="info-header mx-4">SUMMARY</h3>
                <div className="mx-4 mb-3">
                    <hr className="profile-hr"/>
                    <p>Access email: {profile.accessEmail}</p>
                    <p>Permission: {profile.permissions} </p>
                    <p>Status: {profile.status} </p>
                    <p>Language: {profile.language}</p>
                </div>

                {/* edit modal popup*/}
                {/* <div className="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">Request Absence</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Access email:</label>
                                        <input type="email" onChange={(e) => this.onAccessEmailChanged(e)} defaultValue={profile.accessEmail} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status:</label>
                                        <select value={profile.status} onChange={(e) => this.onStatusChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Permissions:</label>
                                        <select value={profile.permissions} onChange={(e) => this.onPermissionsChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Employee">Employee</option>
                                            <option value="HR">HR</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Language:</label>
                                        <select value={profile.language} onChange={(e) => this.onLanguageChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.saveChanges()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <AccountEditModal profile={profile} update={(profile) => this.props.update(profile)} />
            </div>
        )
    }
}
