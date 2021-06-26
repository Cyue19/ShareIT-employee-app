import React, { Component } from 'react';

import ShowIf from "../ShowIf";
import PersonalEditModal from "./modals/PersonalEditModal";

export default class PersonalInfo extends Component {

    render() {
        const { profile, permissions } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative", boxShadowTop: "none"}}>

                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#personalInfoModal">
                    Edit
                    </button>
                </ShowIf>
                
                <h3 className="info-header mx-4 col">IDENTITY</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Full name: {profile.firstName} {profile.lastName}</p>
                    <p>Birth date: </p>
                    <p>Marital status: {profile.maritalStatus}</p>
                    <p>Nationality: {profile.nationality}</p>
                </div>

                <h3 className="info-header mx-4">PERSONAL CONTACT INFORMATION</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Personal email: {profile.personalEmail}</p>
                    <p>Personal phone: {profile.personalPhone}</p>
                    <p>Address: {profile.address}</p>
                </div>

                <h3 className="info-header mx-4">EMERGENCY CONTACT</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Full name: {profile.contact.firstName} {profile.contact.lastName}</p>
                    <p>Phone number: {profile.contact.phone}</p>
                    <p>Relationship: {profile.contact.relationship}</p>
                </div>

                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
                <h3 className="info-header mx-4">IDENTIFICATION</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>ID Number: {profile.idNum}</p>
                    <p>Tax identification number: {profile.taxId}</p>
                    <p>SSN: {profile.ssn}</p>
                    <p>Driving license number: {profile.licenseNum}</p>
                    <p>Car number plate: {profile.carPlateNum}</p>
                </div>

                <h3 className="info-header mx-4">TAX INFORMATION</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Dependents: {profile.dependents}</p>
                    <p>Handicap: {profile.handicap}</p>
                    <p>Income Payee: {profile.payee}</p>
                </div>

                <h3 className="info-header mx-4">EDUCATION</h3>
                <div className="mx-4 mb-5" style={{margin: "auto"}}>
                    <hr className="profile-hr"/>
                    <table className="table" style={{width: "80%", margin: "auto"}}>
                        <thead>
                            <tr>
                                <th scope="col">Course Name</th>
                                <th scope="col">School</th>
                                <th scope="col">Grade</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="info-header mx-4">BANK INFORMATION</h3>
                <div className="mx-4 mb-4">
                    <hr className="profile-hr"/>
                    <p>Bank: {profile.bank}</p>
                    <p>Iban: {profile.iban}</p>
                    <p>Swift: {profile.swift}</p>
                </div>
                </ShowIf>

                <PersonalEditModal profile={profile} update={(profile) => this.props.update(profile)}/>
            </div>
        )
    }
}
