import React, { Component } from 'react';
import ShowIf from "../../ShowIf";

export default class RequestAbsenceModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "",
            period: "",
            periodUnit: "",
            startDate: "",
            endDate: "",
            observations: "",
            error: "",
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createRequest(e) {
        e.preventDefault();

        const {type, period, periodUnit, startDate, endDate, observations} = this.state;
        const {profile} = this.props;

        if (!type || !period || !periodUnit ||!startDate || !endDate || !observations) {
            this.setState({
                error: "Please complete all fields"
            });
            return;
        }

        const newRequest = {id: Date.now(), type: type, period: period + periodUnit, startDate: startDate, endDate: endDate, observations: observations, status: "pending"};
        profile.absenceRequests.push(newRequest);

        this.props.update(profile);

        this.clearInputs();
    }

    clearInputs() {
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
                                <button onClick={() => this.clearInputs()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="period" defaultValue={period} className="form-control"/>
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
                                        <input onChange={(e) => this.handleChange(e)} type="date" name="startDate" defaultValue={startDate} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">End date:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="date" name="endDate" defaultValue={endDate} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Observations:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="observations" defaultValue={observations} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.clearInputs()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={(e) => this.createRequest(e)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
