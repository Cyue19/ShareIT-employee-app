import React, { Component } from 'react'

export default class AccountEditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accessEmail: props.profile.accessEmail,
            permissions: props.profile.permissions,
            status: props.profile.status,
            language: props.profile.language,
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    restoreDefault() {
        this.setState({
            accessEmail: this.props.profile.accessEmail,
            permissions: this.props.profile.permissions,
            status: this.props.profile.status,
            language: this.props.profile.language,
        });
    }

    saveChanges(e) {
        e.preventDefault();
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
        const {accessEmail, permissions, status, language} = this.state;

        return (
            <div>
                <div className="modal fade" id="accountModal" aria-labelledby="accountModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">Request Absence</h5>
                                <button onClick={() => this.restoreDefault()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Access email:</label>
                                        <input type="email" onChange={(e) => this.handleChange(e)} name="accessEmail" value={accessEmail} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Status:</label>
                                        <select value={status} onChange={(e) => this.handleChange(e)} name="status" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Permissions:</label>
                                        <select value={permissions} onChange={(e) => this.handleChange(e)} name="permissions" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="Employee">Employee</option>
                                            <option value="HR">HR</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Language:</label>
                                        <select value={language} onChange={(e) => this.handleChange(e)} name="language" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onCLick={() => this.restoreDefault()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={(e) => this.saveChanges(e)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
