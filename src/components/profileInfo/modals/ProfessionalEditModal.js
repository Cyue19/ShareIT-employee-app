import React, { Component } from 'react';
import EditContracts from "./EditContracts";

export default class ProfessionalEditModal extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            collabId: "",
            labelsAndTags: "",
            workPhone: "",
            workEmail: "",
            job: "",
            manager: "",
            baseSalary: "",
            expenses: "",
            mealAllowance: "",
            flexibleWorkHrs: "",
            comments: ""
        }
    }

    handleChange(e) {
        [e.target.name] = e.target.value;
    }

    saveChanges() {
        const {profile} = this.props;

        profile.collabId = this.state.collabId;
        profile.labelsAndTags = this.state.labelsAndTags;
        profile.workPhone = this.state.workPhone;
        profile.workEmail = this.state.workEmail;
        profile.job = this.state.job;
        profile.manager = this.state.manager;
        profile.baseSalary = this.state.baseSalary;
        profile.expenses = this.state.expenses;
        profile.mealAllowance = this.state.mealAllowance;
        profile.flexibleWorkHrs = this.state.flexibleWorkHrs;
        profile.comment = this.state.comment;

        this.props.update(profile);
        this.setState({});
    }

    render() {
        const {profile} = this.props;

        return (
            <div>
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
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="collabId" defaultValue={profile.collabId} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Labels/Tags:</label>
                                        <select value={profile.labelsAndTags} onChange={(e) => this.handleChange(e)} name="labelsAndTags" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="SH">SH</option>
                                            <option value="SH2">SH2</option>
                                            <option value="AN">AN</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work phone:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="workPhone" defaultValue={profile.workPhone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work email:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="email" name="workEmail" defaultValue={profile.workEmail} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Covered Holidays</h2>

                                    <h2 className="info-header">Job Details</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Job:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="job" defaultValue={profile.job} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Manager:</label>
                                        <input type="text" onChange={(e) => this.handleChange(e)} name="manager" defaultValue={profile.manager} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Salary Conditions</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Base salary:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="baseSalary" defaultValue={profile.baseSalary} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Expenses:</label>
                                        <input type="number" onChange={(e) => this.handleChange(e)} name="expenses" defaultValue={profile.expenses} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Meal allowance:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="mealAllowance" defaultValue={profile.mealAllowance} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Flexible work hours:</label>
                                        <input type="number" onChange={(e) => this.handleChange(e)} name="flexibleWorkHrs" defaultValue={profile.flexibleWorkHrs} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Comments:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="comments" defaultValue={profile.comments} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Contracts</h2>
                                    <EditContracts profile={profile} />

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
