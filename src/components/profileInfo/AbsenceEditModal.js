import React, { Component } from 'react'

export default class AbsenceEditModal extends Component {

    onAbsencesPerYrChanged(e) {
        this.props.profile.absencesPerYr = e.target.value;
    }

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }

    render() {
        const {profile} = this.props;

        return (
            <div>
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
                                        <input onChange={(e) => this.onAbsencesPerYrChanged(e)} type="text" defaultValue={profile.absencesPerYr} className="form-control"/>
                                    </div>
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