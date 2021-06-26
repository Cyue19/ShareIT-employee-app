import React, { Component } from 'react'

export default class AccountEditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accessEmail: "",
            permissions: "",
            status: "",
            language: "",
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveChanges() {
        const {profile} = this.props;

        profile.accessEmail = this.state.accessEmail
        profile.permissions = this.state.permissions
        profile.status = this.state.status
        profile.language = this.state.language

        this.props.update(profile);
        this.setState({});
    }
    
    render() {
        const {profile} = this.props;

        return (
            <div>
                <div className="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">Request Absence</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Access email:</label>
                                        <input type="email" onChange={(e) => this.handleChange(e)} name="accessEmail" defaultValue={profile.accessEmail} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status:</label>
                                        <select value={profile.status} onChange={(e) => this.handleChange(e)} name="status" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Permissions:</label>
                                        <select value={profile.permissions} onChange={(e) => this.handleChange(e)} name="permissions" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Employee">Employee</option>
                                            <option value="HR">HR</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Language:</label>
                                        <select value={profile.language} onChange={(e) => this.handleChange(e)} name="language" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                        </select>
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
