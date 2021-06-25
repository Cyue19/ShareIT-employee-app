import React, { Component } from 'react'

export default class RequestAbsenceModal extends Component {

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

        const newRequest = {type: type, period: period, startDate: startDate, endDate: endDate, observations: observations, status: "pending"}
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

    render() {
        const {type, period, startDate, endDate, observations} = this.state;

        return (
            <div>
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
                                        <input onChange={(e) => this.onStartDateChanged(e)} type="date" defaultValue={startDate} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">End date:</label>
                                        <input onChange={(e) => this.onEndDateChanged(e)} type="date" defaultValue={endDate} className="form-control"/>
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
