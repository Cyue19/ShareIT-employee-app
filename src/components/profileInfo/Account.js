import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import AccountEditModal from "./modals/AccountEditModal";

export default class Account extends Component {

    render() {
        const {profile, self} = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%"}}>
                <ShowIf isTrue={self || profile.permissions==="HR" || profile.permissions ==="Admin"}>
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

                <AccountEditModal profile={profile} update={(profile) => this.props.update(profile)} />
            </div>
        )
    }
}
