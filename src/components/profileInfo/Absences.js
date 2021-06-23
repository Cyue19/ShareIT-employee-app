import React, { Component } from 'react';
import ShowIf from "../ShowIf";

export default class Absences extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            period: "",
            startDate: "",
            endDate: "",
            observations: "",
            error: ""
        }
    }

    onTypeChanged(e) {
        this.setState({
            type: e.target.value
        });
    }

    onPeriodChanged(e) {
        this.setState({
            period: e.target.value
        });
    }

    onStartDateChanged(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onEndDateChanged(e) {
        this.setState({
            endDate: e.target.value
        });
    }

    onObservationsChanged(e) {
        this.setState({
            observations: e.target.value
        });
    }

    createRequest() {
        const {type, period, startDate, endDate, observations} = this.state;
        const {profile} = this.props;

        if (!type || !period || !startDate || !endDate || !observations) {
            this.setState({
                error: "Please complete all fields"
            });
            return;
        }

        const newRequest = {type: type, period: period, startDate: startDate, endDate: endDate, observations: observations}
        profile.absenceRequests.push(newRequest);

        this.props.update(profile);

        this.setState({
            type: "",
            period: "",
            startDate: "",
            endDate: "",
            observations: "",
            error: ""
        });
    }

    onAbsencesPerYrChanged(e) {
        this.props.profile.absencesPerYr = e.target.value;
    }

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }

    render() {
        const {profile, permissions} = this.props;
        const {type, period, startDate, endDate, observations} = this.state;

        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative"}}>
                <ShowIf isTrue={this.props.self || permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#requestAbsenceModal">
                    Request
                    </button>
                </ShowIf>

                <ShowIf isTrue={permissions==="HR" || permissions ==="Admin"}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "79%", top: "1vh"}} data-bs-toggle="modal" data-bs-target="#editAbsenceModal">
                    Edit
                    </button>
                </ShowIf>

                <h3 className="info-header mx-4">SUMMARY</h3>
                <div className="mx-4 mb-3">
                    <hr className="profile-hr"/>
                    <p>Absences per year: {profile.absencesPerYr}</p>
                </div>
                <table className="table" style={{width: "80%", margin: "auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Period</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Observations</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { profile.absenceRequests.map(request => 
                            <tr>
                                <td>{request.type}</td>
                                <td>{request.period}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.observations}</td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* edit modal popup*/}
                <div className="modal fade" id="editAbsenceModal" tabindex="-1" aria-labelledby="editAbsenceModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editAbsenceModalLabel">Request Absence</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Absences</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Absences per year:</label>
                                        <input onChange={(e) => this.onAbsencesPerYrChanged(e)} type="text" defaultValue={observations} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.createRequest()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* request absence modal popup*/}
                <div className="modal fade" id="requestAbsenceModal" tabindex="-1" aria-labelledby="requestAbsenceModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="requestAbsenceModalLabel">Request Absence</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Type:</label>
                                        <select value={type} onChange={(e) => this.onTypeChanged(e)} className="form-select">
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
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Period:</label>
                                        <select value={period} onChange={(e) => this.onPeriodChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Days">Days</option>
                                            <option value="Half day">Half day</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Start date:</label>
                                        <select value={startDate} onChange={(e) => this.onStartDateChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">End date:</label>
                                        <select value={endDate} onChange={(e) => this.onEndDateChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Employee">Employee</option>
                                            <option value="HR">HR</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Observations:</label>
                                        <input onChange={(e) => this.onObservationsChanged(e)} type="text" defaultValue={observations} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.createRequest()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
