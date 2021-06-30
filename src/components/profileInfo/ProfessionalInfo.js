import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import ProfessionalEditModal from "./modals/ProfessionalEditModal";

export default class ProfessionalInfo extends Component {

    render() {
        const { profile, self, permissions } = this.props;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative", boxShadowTop: "none"}}>
                <ShowIf isTrue={self || permissions==="HR" || permissions ==="Admin"}>
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
                    <p>Manager: {profile.manager.fullName}</p>
                </div>

                <ShowIf isTrue={self || permissions==="HR" || permissions ==="Admin"}>
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
                    { profile.contracts.map(contract => 
                        <div class="card">
                        <h5 class="card-header">{contract.title}</h5>
                        <div class="card-body">
                          <p class="card-text">Dates: {contract.startDate.slice(8,)}/{contract.startDate.slice(5,7)}/{contract.startDate.slice(0,4)} - {contract.endDate.slice(8,)}/{contract.endDate.slice(5,7)}/{contract.endDate.slice(0,4)}</p>
                          <p class="card-text">Comments: {contract.comments}</p>
                        </div>
                      </div>
                    )}
                </div>
                </ShowIf>

                <ProfessionalEditModal profile={profile} update={(profile) => this.props.update(profile)}/>
            </div>
        )
    }
}
