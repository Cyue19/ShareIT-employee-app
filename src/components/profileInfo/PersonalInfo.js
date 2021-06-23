import React, { Component } from 'react';

import ShowIf from "../ShowIf";

export default class PersonalInfo extends Component {

    onFirstNameChanged(e) {
        this.props.profile.firstName = e.target.value;
    }

    onLastNameChanged(e) {
        this.props.profile.lastName = e.target.value;
    }

    onMaritalStatusChanged(e) {
        this.props.profile.maritalStatus = e.target.value;
    }

    onNationalityChanged(e) {
        this.props.profile.nationality = e.target.value;
    }

    onPersonalEmailChanged(e) {
        this.props.profile.personalEmail = e.target.value;
    }

    onPersonalPhoneChanged(e) {
        this.props.profile.personalPhone = e.target.value;
    }

    onAddressChanged(e) {
        this.props.profile.address = e.target.value;
    }

    onContactFirstNameChanged(e) {
        this.props.profile.contact.firstName = e.target.value;
    }

    onContactLastNameChanged(e) {
        this.props.profile.contact.lastName = e.target.value;
    }

    onContactPhoneChanged(e) {
        this.props.profile.contact.phone = e.target.value;
    }

    onContactRelationshipChanged(e) {
        this.props.profile.contact.relationship = e.target.value;
    }

    onIdNumChanged(e) {
        this.props.profile.idNum = e.target.value;
    }

    onTaxIdChanged(e) {
        this.props.profile.taxId = e.target.value;
    }

    onSSNChanged(e) {
        this.props.profile.ssn = e.target.value;
    }

    onLicenseNumChanged(e) {
        this.props.profile.licenseNum = e.target.value;
    }

    onCarPlateNumChanged(e) {
        this.props.profile.carPlateNum = e.target.value;
    }

    onDependentsChanged(e) {
        this.props.profile.dependents = e.target.value;
    }

    onHandicapChanged(e) {
        this.props.profile.handicap = e.target.value;
    }

    onPayeeChanged(e) {
        this.props.profile.payee = e.target.value;
    }

    onBankChanged(e) {
        this.props.profile.bank = e.target.value;
    }

    onIbanChanged(e) {
        this.props.profile.iban = e.target.value;
    }

    onSwiftChanged(e) {
        this.props.profile.swift = e.target.value;
    }

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }


    render() {
        const { profile } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative", boxShadowTop: "none"}}>

                <ShowIf isTrue={this.props.self}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: ".5%"}} data-bs-toggle="modal" data-bs-target="#personalInfoModal">
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

                <ShowIf isTrue={this.props.self}>
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

                <h3 className="info-header mx-5">BANK INFORMATION</h3>
                <div className="mx-4 mb-4">
                    <hr className="profile-hr"/>
                    <p>Bank: {profile.bank}</p>
                    <p>Iban: {profile.iban}</p>
                    <p>Swift: {profile.swift}</p>
                </div>
                </ShowIf>

                {/* edit modal popup*/}
                <div className="modal fade" id="personalInfoModal" tabindex="-1" aria-labelledby="personalInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="personalInfoModalLabel">Edit Personal Information</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Identity</h2>

                                    <div className="col-6 mb-3">
                                        <label className="form-label">First name:</label>
                                        <input onChange={(e) => this.onFirstNameChanged(e)} type="text" defaultValue={profile.firstName} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Last name:</label>
                                        <input onChange={(e) => this.onLastNameChanged(e)} type="text" defaultValue={profile.lastName} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Marital status:</label>
                                        <select value={profile.maritalStatus} onChange={(e) => this.onMaritalStatusChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="separated">Separated</option>
                                            <option value="widowed">Widowed</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nationality:</label>
                                        <select value={profile.nationality} onChange={(e) => this.onNationalityChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>

                                    <h2 className="info-header">Contact Information</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Personal email:</label>
                                        <input type="email" onChange={(e) => this.onPersonalEmailChanged(e)} defaultValue={profile.personalEmail} className="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Personal phone:</label>
                                        <input type="number" onChange={(e) => this.onPersonalPhoneChanged(e)} defaultValue={profile.personalPhone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address:</label>
                                        <input type="text" onChange={(e) => this.onAddressChanged(e)} defaultValue={profile.address} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Emergency Contact</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">First name:</label>
                                        <input type="text" onChange={(e) => this.onContactFirstNameChanged(e)} defaultValue={profile.contact.firstName} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Last name:</label>
                                        <input type="text" onChange={(e) => this.onContactLastNameChanged(e)} defaultValue={profile.contact.lastName} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone number:</label>
                                        <input type="number" onChange={(e) => this.onContactPhoneChanged(e)} defaultValue={profile.contact.phone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Relationship:</label>
                                        <select value={profile.contact.relationship} onChange={(e) => this.onContactRelationshipChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="parent">Parent</option>
                                            <option value="guardian">Guardian</option>
                                            <option value="spouse">Spouse</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>


                                    <h2 className="info-header">Identification</h2>
                                    <div className="mb-3">
                                        <label className="form-label">ID number:</label>
                                        <input onChange={(e) => this.onIdNumChanged(e)} type="number" defaultValue={profile.idNum} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tax identification number:</label>
                                        <input type="number" onChange={(e) => this.onTaxIdChanged(e)} defaultValue={profile.taxId} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">SSN:</label>
                                        <input type="number" onChange={(e) => this.onSSNChanged(e)} defaultValue={profile.ssn} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Driving license number:</label>
                                        <input type="number" onChange={(e) => this.onLicenseNumChanged(e)} defaultValue={profile.licenseNum} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Car number plate:</label>
                                        <input type="text" onChange={(e) => this.onCarPlateNumChanged(e)} defaultValue={profile.carPlateNum} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Tax Information</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Dependents:</label>
                                        <input type="number" onChange={(e) => this.onDependentsChanged(e)} defaultValue={profile.dependents} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Handicap:</label>
                                        <input type="text" onChange={(e) => this.onHandicapChanged(e)} defaultValue={profile.handicap} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Income payee:</label>
                                        <input type="text" onChange={(e) => this.onPayeeChanged(e)} defaultValue={profile.payee} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Education</h2>

                                    <h2 className="info-header">Bank Information</h2>
                                        <div className="mb-3">
                                            <label className="form-label">Bank:</label>
                                            <input onChange={(e) => this.onBankChanged(e)} type="text" defaultValue={profile.bank} className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Iban:</label>
                                            <input type="text" onChange={(e) => this.onIbanChanged(e)} defaultValue={profile.iban} className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Swift:</label>
                                            <input type="text" onChange={(e) => this.onSwiftChanged(e)} defaultValue={profile.swift} className="form-control"/>
                                        </div>
                                </form>
                            </div>

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