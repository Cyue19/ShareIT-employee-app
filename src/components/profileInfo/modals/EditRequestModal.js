import React, { Component } from 'react';
import Firebase from "../../../firebase/Firebase";

export default class EditRequestModal extends Component {
    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;

        this.state = {
            type: props.request.type,
            period: props.request.period,
            periodUnit: props.request.periodUnit,
            startDate: props.request.startDate,
            endDate: props.request.endDate,
            observations: props.request.observations,
            status: props.request.status,
            error: "",
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    restoreDefault() {
        const {request} = this.props;
        this.setState({
            type: request.type,
            period: request.period,
            periodUnit: request.periodUnit,
            startDate: request.startDate,
            endDate: request.endDate,
            status: request.status,
            observations: request.observations,
            error: "",
        })
    }

    saveChanges(e) {
        const {profile, request} = this.props;

        request.type = this.state.type;
        request.period = this.state.period;
        request.periodUnit = this.state.periodUnit;
        request.startDate = this.state.startDate;
        request.endDate = this.state.endDate;
        request.status = this.state.status;
        request.observations = this.state.observations;

        const updatedRequests = profile.absenceRequests.map(req => req.id !== request.id ? req : request);
        profile.absenceRequests = updatedRequests;

        this.props.onUpdate(profile);
    }

    render() {
        const { type, period, periodUnit, startDate, endDate, status, observations, error } = this.state;

        return (
            <div className="modal fade" id="editRequestModal" aria-labelledby="editRequestModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editRequestModalLabel">Edit Absence</h5>
                                <button onClick={() => this.restoreDefault()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            {/* <ShowIf isTrue={error}>
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </ShowIf> */}

                            <div className="modal-body">
                                <form className="row">
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
                                        <label className="form-label">Status:</label>
                                        <select value={status} onChange={(e) => this.handleChange(e)} name="status" className="form-select">
                                            <option value="pending">Pending</option>
                                            <option value="success">Success</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                        </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Observations:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="observations" value={observations} className="form-control"/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.restoreDefault()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={(e) => this.saveChanges(e)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
