import React, { Component } from 'react';
import Nationalities from "./Nationalities";

export default class PersonalEditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: props.profile.firstName,
            lastName: "",
            birthDate: "",
            maritalStatus: "",
            nationality: "",
            personalEmail: "",
            personalPhone: "",
            line1: "",
            line2: "",
            zipCode: "",
            city: "",
            country: "",
            contactFirstName: "",
            contactLastName: "",
            contactPhone: "",
            contactRelationship: "",
            idNum: "",
            taxId: "",
            ssn: "",
            licenseNum: "",
            carPlateNum: "",
            dependents: "",
            handicap: "",
            payee: "",
            school: "",
            degree: "",
            courses: "",
            bank: "",
            iban: "",
            swift: ""
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    restoreDefault() {
        this.setState({
            firstName: this.props.profile.firstName
        });
    }

    saveChanges() {
        this.props.profile.firstName = this.state.firstName;
        this.props.profile.lastName = this.state.lastName;
        this.props.profile.birthDate = this.state.birthDate;
        this.props.profile.maritalStatus = this.state.maritalStatus;
        this.props.profile.nationality = this.state.nationality;
        this.props.profile.personalEmail = this.state.personalEmail;
        this.props.profile.personalPhone = this.state.personalPhone;
        this.props.profile.address.line1 = this.state.line1;
        this.props.profile.address.line2 = this.state.line2;
        this.props.profile.address.zipCode = this.state.zipCode;
        this.props.profile.address.city = this.state.city;
        this.props.profile.address.country = this.state.country;
        this.props.profile.contact.firstName = this.state.contactFirstName;
        this.props.profile.contact.fastName = this.state.contactLastName;
        this.props.profile.contact.phone = this.state.contactPhone;
        this.props.profile.contact.relationship = this.state.contactRelationship;
        this.props.profile.idNum = this.state.idNum;
        this.props.profile.taxId = this.state.taxId;
        this.props.profile.ssn = this.state.ssn;
        this.props.profile.licenseNum = this.state.licenseNum;
        this.props.profile.carPlateNum = this.state.carPlateNum;
        this.props.profile.dependents = this.state.dependents;
        this.props.profile.handicap = this.state.handicap;
        this.props.profile.payee = this.state.payee;
        this.props.profile.school = this.state.school;
        this.props.profile.degree = this.state.degree;
        this.props.profile.courses = this.state.courses;
        this.props.profile.bank = this.state.bank;
        this.props.profile.iban = this.state.iban;
        this.props.profile.swift = this.state.swift;
        this.props.update(this.props.profile);
        this.setState({});
    }
    
    render() {
        const { profile } = this.props;
        return (
            <div>
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
                                        <input onChange={(e) => this.onChange(e)} type="text" name="firstName" value={this.state.firstName} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Last name:</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" name="lastName" defaultValue={profile.lastName} className="form-control"/>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">Birth date:</label>
                                        <input onChange={(e) => this.onChange(e)} type="date" name="birthDate" defaultValue={profile.birthDate} className="form-control"/>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">Marital status:</label>
                                        <select value={profile.maritalStatus} onChange={(e) => this.onChange(e)} name="maritalStatus" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="separated">Separated</option>
                                            <option value="widowed">Widowed</option>
                                        </select>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">Nationality:</label>
                                        <Nationalities profile={profile} onNationalityChanged={(e) => this.onChange(e)} />
                                    </div>

                                    <h2 className="info-header">Contact Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Personal email:</label>
                                        <input type="email" onChange={(e) => this.onChange(e)} name="personalEmail" defaultValue={profile.personalEmail} className="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Personal phone:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="personalPhone" defaultValue={profile.personalPhone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address line 1:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="line1" defaultValue={profile.address.line1} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address line 2:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="line2" defaultValue={profile.address.line2} className="form-control"/>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">City:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="city" defaultValue={profile.address.city} className="form-control"/>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">Zip code:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="zipCode" defaultValue={profile.address.zipCode} className="form-control"/>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label className="form-label">Country:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="country" defaultValue={profile.address.country} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Emergency Contact</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">First name:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="contactFirstName" defaultValue={profile.contact.firstName} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Last name:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="contactLastName" defaultValue={profile.contact.lastName} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Phone number:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="contactPhone" defaultValue={profile.contact.phone} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Relationship:</label>
                                        <select value={profile.contact.relationship} onChange={(e) => this.onChange(e)} name="contactRelationship" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="parent">Parent</option>
                                            <option value="guardian">Guardian</option>
                                            <option value="spouse">Spouse</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>


                                    <h2 className="info-header">Identification</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">ID number:</label>
                                        <input onChange={(e) => this.onChange(e)} type="number" name="idNum" defaultValue={profile.idNum} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Tax identification number:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="taxId" defaultValue={profile.taxId} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">SSN:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="ssn" defaultValue={profile.ssn} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Driving license number:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="licenseNum" defaultValue={profile.licenseNum} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Car number plate:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="carPlateNum" defaultValue={profile.carPlateNum} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Tax Information</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Dependents:</label>
                                        <input type="number" onChange={(e) => this.onChange(e)} name="dependents" defaultValue={profile.dependents} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Handicap:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="handicap" defaultValue={profile.handicap} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Income payee:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="payee" defaultValue={profile.payee} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Education</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">School:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="school" defaultValue={profile.school} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Degree:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="degree" defaultValue={profile.degree} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Courses:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="courses" defaultValue={profile.courses} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Bank Information</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Bank:</label>
                                        <input onChange={(e) => this.onChange(e)} type="text" name="bank" defaultValue={profile.bank} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Iban:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="iban" defaultValue={profile.iban} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Swift:</label>
                                        <input type="text" onChange={(e) => this.onChange(e)} name="swift" defaultValue={profile.swift} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.restoreDefault()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.saveChanges()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
