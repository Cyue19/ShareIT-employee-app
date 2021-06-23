import React, { Component } from 'react';
import ShowIf from "../ShowIf";

export default class ProfessionalInfo extends Component {

    onCollabIdChanged(e) {
        this.props.profile.collabId = e.target.value;
    }

    onLabelsAndTagsChanged(e) {
        this.props.profile.labelsAndTags = e.target.value;
    }

    onWorkPhoneChanged(e) {
        this.props.profile.workPhone = e.target.value;
    }

    onWorkEmailChanged(e) {
        this.props.profile.workEmail = e.target.value;
    }

    onJobChanged(e) {
        this.props.profile.job = e.target.value;
    }

    onManagerChanged(e) {
        this.props.profile.manager = e.target.value;
    }

    onBaseSalaryChanged(e) {
        this.props.profile.baseSalary = e.target.value;
    }

    onExpensesChanged(e) {
        this.props.profile.expenses = e.target.value;
    }

    onMealAllowanceChanged(e) {
        this.props.profile.mealAllowance = e.target.value;
    }

    onFlexibleWorkHrsChanged(e) {
        this.props.profile.flexibleWorkHrs = e.target.value;
    }

    onCommentsChanged(e) {
        this.props.profile.comments = e.target.value;
    }

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }


    render() {
        const { profile } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative"}}>
                <ShowIf isTrue={this.props.self}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: ".5%"}} data-bs-toggle="modal" data-bs-target="#profInfoModal">
                    Edit
                    </button>
                </ShowIf>

                <h3 className="info-header mx-4">PROFESSIONAL IDENTITY</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Collaborator ID: {profile.collabId}</p>
                    <p>Label/Tags: {profile.labelAndTags}</p>
                    <p>Work phone: {profile.workPhone}</p>
                    <p>Work email: {profile.workEmail}</p>
                </div>

                <h3 className="info-header mx-4">COVERED HOLIDAYS</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Country: </p>
                    <p>Region: </p>
                </div>

                <h3 className="info-header mx-4">JOB DETAILS</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Job: {profile.job}</p>
                    <p>Manager: {profile.manager}</p>
                </div>

                <ShowIf isTrue={this.props.self}>
                <h3 className="info-header mx-4">SALARY CONDITIONS</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Base salary: {profile.baseSalary}</p>
                    <p>Expenses: {profile.expenses}</p>
                    <p>Meal allowance: {profile.mealAllowance}</p>
                    <p>Flexible work hours: {profile.flexibleWorkHrs}</p>
                    <p>Comments: {profile.comments}</p>
                </div>

                <h3 className="info-header mx-4">CONTRACTS</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Full time, fixed term: </p>
                    <p>Full time, unfixed Term: </p>
                    <p>Part time, fixed term: </p>
                    <p>Part time, unfixed term: </p>
                    <p>Internship: </p>
                    <p>Freelance: </p>
                </div>
                </ShowIf>

                {/* edit modal popup*/}
                <div className="modal fade" id="profInfoModal" tabindex="-1" aria-labelledby="profInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="profInfoModalLabel">Edit Personal Information</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Professional Identity</h2>

                                    <div className="col-6 mb-3">
                                        <label className="form-label">Collaborator Id:</label>
                                        <input onChange={(e) => this.onCollabIdChanged(e)} type="number" defaultValue={profile.collabId} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Labels/Tags:</label>
                                        <input onChange={(e) => this.onLabelsAndTagsChanged(e)} type="text" defaultValue={profile.labelsAndTags} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work phone:</label>
                                        <input onChange={(e) => this.onWorkPhoneChanged(e)} type="number" defaultValue={profile.workPhone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work email:</label>
                                        <input onChange={(e) => this.onWorkEmailChanged(e)} type="email" defaultValue={profile.workEmail} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Covered Holidays</h2>

                                    <h2 className="info-header">Job Details</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Job:</label>
                                        <input onChange={(e) => this.onJobChanged(e)} type="text" defaultValue={profile.job} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Manager:</label>
                                        <input type="text" onChange={(e) => this.onManagerChanged(e)} defaultValue={profile.manager} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Salary Conditions</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Base salary:</label>
                                        <input onChange={(e) => this.onBaseSalaryChanged(e)} type="number" defaultValue={profile.baseSalary} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Expenses:</label>
                                        <input type="number" onChange={(e) => this.onExpensesChanged(e)} defaultValue={profile.expenses} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Meal allowance:</label>
                                        <input onChange={(e) => this.onMealAllowanceChanged(e)} type="number" defaultValue={profile.mealAllowance} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Flexible work hours:</label>
                                        <input type="text" onChange={(e) => this.onFlexibleWorkHrsChanged(e)} defaultValue={profile.flexibleWorkHrs} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Comments:</label>
                                        <input onChange={(e) => this.onCommentsChanged(e)} type="text" defaultValue={profile.comments} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Contracts</h2>

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
