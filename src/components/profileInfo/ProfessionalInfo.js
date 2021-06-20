import React, { Component } from 'react'

export default class ProfessionalInfo extends Component {
    render() {
        return (
            <div className="form-card" style={{backgroundColor: "white"}}>
                <h3 className="info-header mx-4">PROFESSIONAL IDENTITY</h3>
                <div className="mx-4 mb-3">
                    <p>Collaborator ID: </p>
                    <p>Label/Tags: </p>
                    <p>Professional phone: </p>
                    <p>Professional email: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">COVERED HOLIDAYS</h3>
                <div className="mx-4 mb-3">
                    <p>Country: </p>
                    <p>Region: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">JOB DETAILS</h3>
                <div className="mx-4 mb-3">
                    <p>Job: </p>
                    <p>Manager:</p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">SALARY CONDITIONS</h3>
                <div className="mx-4 mb-3">
                    <p>Base salary: </p>
                    <p>Expenses: </p>
                    <p>Meal allowance: </p>
                    <p>Flexible work hours: </p>
                    <p>Comments: </p>
                    <hr/>
                </div>

                <h3 className="info-header mx-4">CONTRACTS</h3>
                <div className="mx-4 mb-3">
                    <p>Full time, fixed term: </p>
                    <p>Full time, unfixed Term: </p>
                    <p>Part time, fixed term: </p>
                    <p>Part time, unfixed term: </p>
                    <p>Internship: </p>
                    <p>Freelance: </p>
                    <hr/>
                </div>
            </div>
        )
    }
}
