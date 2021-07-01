import React, { Component } from 'react';
import ShowIf from "../ShowIf";
import AbsenceEditModal from "./modals/AbsenceEditModal";
import RequestAbsenceModal from "./modals/RequestAbsenceModal";
import EditRequestModal from "./modals/EditRequestModal";

import Firebase from "../../firebase/Firebase";

export default class Absences extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;

        this.state = {
            currRequest: "",
            prevCount: props.profile.newCount,
        }
    }

    getStatusLabel(status) {
        switch (status) {
            case "success":
                return (
                    <div className="text-center pt-1" style={{backgroundColor: "#03C03C", color: "white", height: "25px", width: "80px", borderRadius: "3px", fontSize: "12px"}}>
                        SUCCESS
                    </div>
                    );
            case "canceled":
                return (
                    <div className="text-center pt-1" style={{backgroundColor: "lightgrey", color: "white", height: "25px", width: "80px", borderRadius: "3px", fontSize: "12px"}}>
                        CANCELED
                    </div>
                                    
                );
            case "pending":
                return (
                    <div className="text-center pt-1" style={{backgroundColor: "#007FFF", color: "white", height: "25px", width: "80px", borderRadius: "3px", fontSize: "12px"}}>
                        PENDING
                    </div>
                );
            default:
                break;
        }
    }

    passRequest(request) {
        this.setState({
            currRequest: request
        });
    }

    onUpdateAbsence(profile) {
        this.props.update(profile);
        this.sendEditNotifications("Your absence request has been edited.");
    }

    onRemoveAbsence(id) {
        const {profile} = this.props;
        const updatedAbsences = profile.absenceRequests.filter(absence => absence.id !== id);
        profile.absenceRequests = updatedAbsences;
        this.sendEditNotifications("Your absence request has been deleted.");
        this.props.update(profile);
    }

    async sendEditNotifications(message) {
        const {profile} = this.props;
        const updatedNotifs = profile.notifications;

        if(!profile.newCount) {
            this.setState({
                prevCount: 0
            });
        }
        const newCount = this.state.prevCount + 1;
        updatedNotifs.push({message: message, notifId: Date.now(), recipientId: profile.userId});
        
        await this.db.collection("profiles").doc(profile.userId).update({
            notifications: updatedNotifs,
            newCount
        });

        this.setState({});
    }

    render() {
        const {profile, self, permissions} = this.props;
        const {currRequest} = this.state;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative"}}>
                <ShowIf isTrue={self}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#requestAbsenceModal">
                    Request
                    </button>
                </ShowIf>

                <ShowIf isTrue={permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#editAbsenceModal">
                    Edit
                    </button>
                </ShowIf>

                <h3 className="info-header mx-4">SUMMARY</h3>
                <div className="mx-4 mb-3">
                    <hr className="profile-hr"/>
                    <p>Absences per year: {profile.absencesPerYr}</p>
                </div>
                <table className="table table-hover profile-table mb-5" style={{width: "80%", margin: "auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">ABSENCE TYPE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">DATE</th>
                            <th scope="col">DURATION</th>
                            <th scope="col">OBSERVATIONS</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { profile.absenceRequests.map(request => 
                            <tr key={request.id}>
                                <td>{request.type}</td>
                                <td>{this.getStatusLabel(request.status)}</td>
                                <td>{request.startDate.slice(8,)}/{request.startDate.slice(5,7)}/{request.startDate.slice(0,4)} - {request.endDate.slice(8,)}/{request.endDate.slice(5,7)}/{request.endDate.slice(0,4)}</td>
                                <td>{request.period} {request.periodUnit}</td>
                                <td>{request.observations}</td>
                                <td>
                                    <ShowIf isTrue={permissions==="Admin" || permissions==="HR"}>
                                        <button onClick={() => this.passRequest(request)} style={{padding: "2px 6px"}} type="button" className="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#editRequestModal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => this.onRemoveAbsence(request.id)} style={{padding: "2px 6px"}} type="button" className="btn btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </ShowIf>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <EditRequestModal request={currRequest} profile={this.props.profile} onUpdate={(profile) => this.onUpdateAbsence(profile)}/>
                <AbsenceEditModal profile={profile} update={(profile) => this.props.update(profile)} />
                <RequestAbsenceModal profile={profile} update={(profile) => this.props.update(profile)} />
            </div>
        )
    }
}
