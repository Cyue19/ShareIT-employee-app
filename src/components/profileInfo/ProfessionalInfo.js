import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import ProfessionalEditModal from "./ProfessionalEditModal";

export default class ProfessionalInfo extends Component {

    render() {
        const { profile, permissions } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative", boxShadowTop: "none"}}>
                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#profInfoModal">
                    Edit
                    </button>
                </ShowIf>

                <h3 className="info-header mx-4">PROFESSIONAL IDENTITY</h3>
                <div className="mx-4 mb-5">
                    <hr className="profile-hr"/>
                    <p>Collaborator ID: {profile.collabId}</p>
                    <p>Label/Tags: {profile.labelsAndTags}</p>
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

                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
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

                <ProfessionalEditModal profile={profile} update={(profile) => this.props.update(profile)}/>
            </div>
        )
    }
}
