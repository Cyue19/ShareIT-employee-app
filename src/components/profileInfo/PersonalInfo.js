import React, { Component } from 'react'

export default class PersonalInfo extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative"}}>
                <h3 className="info-header mx-4">IDENTITY</h3>
                <div className="mx-4 mb-3">
                    <p>Full name: {profile.firstName} {profile.lastName}</p>
                    <p>Birth date: </p>
                    <p>Marital Status: </p>
                    <p>Nationality: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">CONTACT INFORMATION</h3>
                <div className="mx-4 mb-3">
                    <p>Email: </p>
                    <p>Phone number: </p>
                    <p>Address: </p>
                    <p>Name: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">EMERGENCY CONTACT</h3>
                <div className="mx-4 mb-3">
                    <p>Phone number: </p>
                    <p>Relationship:</p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">IDENTIFICATION</h3>
                <div className="mx-4 mb-3">
                    <p>ID Number: </p>
                    <p>Tax identification number: </p>
                    <p>SSN: </p>
                    <p>Driving license number: </p>
                    <p>Car number plate: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">TAX INFORMATION</h3>
                <div className="mx-4 mb-3">
                    <p>Dependents: </p>
                    <p>Handicap: </p>
                    <p>Income Payee: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">EDUCATION</h3>
                <div className="mx-4 mb-3">
                    <p>Degree: </p>
                    <p>Course: </p>
                    <p>School: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">BANK INFORMATION</h3>
                <div className="mx-4 mb-3">
                    <p>Bank: </p>
                    <p>Iban: </p>
                    <p>Swift: </p>
                </div>
            </div>
        )
    }
}
