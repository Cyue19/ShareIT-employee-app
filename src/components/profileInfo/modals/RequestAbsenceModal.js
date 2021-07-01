import React, { Component } from 'react';
import ShowIf from "../../ShowIf";
import Firebase from "../../../firebase/Firebase";

export default class RequestAbsenceModal extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;

        this.state = {
            type: "",
            period: "",
            periodUnit: "",
            startDate: "",
            endDate: "",
            observations: "",
            prevCount: 0,
            error: "",
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /** Create a new absence request */
    createRequest(e) {
        const {type, period, periodUnit, startDate, endDate, observations} = this.state;
        const {profile} = this.props;

        if (!type || !period || !periodUnit ||!startDate || !endDate || !observations) {
            this.setState({
                error: "Please complete all fields"
            });
            return;
        }

        const newRequest = {id: Date.now(), type: type, period: period, periodUnit: periodUnit, startDate: startDate, endDate: endDate, observations: observations, status: "pending"};
        profile.absenceRequests.push(newRequest);

        this.props.update(profile);
        this.sendRequestNotification();

        this.restoreDefault();
    }

    /**Sends notification of absence request to manager */
    async sendRequestNotification() {
        try {
            const {profile} = this.props;
            const managerId = profile.manager.userId;
            const message = profile.firstName + " " + profile.lastName + " has requested an absence";

            const doc = await this.db.collection("profiles").doc(managerId).get();
            const updatedNotifs = doc.data().notifications;
            if (doc.data().newCount) {
                const prevCount = doc.data().newCount;
                this.setState({
                    prevCount
                });
            }
            const newCount = this.state.prevCount + 1;
            const newNotif = {message: message, notifId: Date.now(), recipientId: profile.userId, newCount: newCount}
            updatedNotifs.push(newNotif);

            await this.db.collection("profiles").doc(managerId).update({
                notifications: updatedNotifs,
                newCount
            });
        } catch(err) {
            console.log(err);
        }
    }

    /**Clear modal inputs */
    restoreDefault() {
        this.setState({
            type: "",
            period: "",
            periodUnit: "",
            startDate: "",
            endDate: "",
            observations: "",
            error: "",
            isHidden: true
        });
    }

    render() {
        const {type, period, periodUnit, startDate, endDate, observations, error} = this.state;

        return (
            <div>
                <div className="modal fade" id="requestAbsenceModal" aria-labelledby="requestAbsenceModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="requestAbsenceModalLabel">Request Absence</h5>
                                <button onClick={() => this.restoreDefault()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <ShowIf isTrue={error}>
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </ShowIf>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Type:</label>
                                        <select value={type} onChange={(e) => this.handleChange(e)} name="type" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Vacation">Vacation</option>
                                            <option value="Medical absence">Medical absence</option>
                                            <option value="Unjustified absence">Unjustified absence</option>
                                            <option value="Justified absence">Justified absence</option>
                                            <option value="Family absence">Family absence</option>
                                            <option value="Education absence">Education absence</option>
                                            <option value="Marriage license">Marriage license</option>
                                            <option value="Maternity/Paternity leave">Maternity/Paternity leave</option>
                                            <option value="Family member death">Family member death</option>
                                            <option value="Extra (compensation)">Extra</option>
                                        </select>
                                    </div>
                                    <div className="col-6 row mb-3">
                                        <label className="form-label">Period:</label>

                                        <div className="col-6 pe-0">
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="period" value={period} className="form-control"/>
                                        </div>

                                        <div className="col-6 ps-0">
                                        <select value={periodUnit} onChange={(e) => this.handleChange(e)} name="periodUnit" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value=" days">days</option>
                                            <option value=" half day">half day</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Start date:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="date" name="startDate" value={startDate} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">End date:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="date" name="endDate" value={endDate} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Observations:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="observations" value={observations} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.restoreDefault()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.createRequest()} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
