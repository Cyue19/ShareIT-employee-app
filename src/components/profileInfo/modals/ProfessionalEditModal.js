import React, { Component } from 'react';
import EditContracts from "./EditContracts";

export default class ProfessionalEditModal extends Component {
    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         contractTitle: "",
    //         contractStartDate: "",
    //         contractEndDate: "",
    //         contractComments: ""
    //     }
    // }

    onCollabIdChanged(e) {
        this.props.profile.collabId = e.target.value;
    }

    onLabelsAndTagsChanged(e) {
        this.props.profile.labelsAndTags = e.target.value;
    }

    onWorkPhoneChanged(e) {
        this.props.profile.workPhone = e.target.value;
    }

    onWorkEmailChanged(e) {
        this.props.profile.workEmail = e.target.value;
    }

    onJobChanged(e) {
        this.props.profile.job = e.target.value;
    }

    onManagerChanged(e) {
        this.props.profile.manager = e.target.value;
    }

    onBaseSalaryChanged(e) {
        this.props.profile.baseSalary = e.target.value;
    }

    onExpensesChanged(e) {
        this.props.profile.expenses = e.target.value;
    }

    onMealAllowanceChanged(e) {
        this.props.profile.mealAllowance = e.target.value;
    }

    onFlexibleWorkHrsChanged(e) {
        this.props.profile.flexibleWorkHrs = e.target.value;
    }

    onCommentsChanged(e) {
        this.props.profile.comments = e.target.value;
    }

    // onContractTitleChanged(e) {
    //     this.setState({
    //         contractTitle: e.target.value
    //     });
    // }

    // onContractStartDateChanged(e) {
    //     this.setState({
    //         contractStartDate: e.target.value
    //     });
    // }

    // onContractEndDateChanged(e) {
    //     this.setState({
    //         contractEndDate: e.target.value
    //     });
    // }

    // onContractCommentsChanged(e) {
    //     this.setState({
    //         contractComments: e.target.value
    //     });
    // }

    // createContract() {
    //     const {contractTitle, contractStartDate, contractEndDate, contractComments} = this.state;
    //     this.props.profile.contracts.push({id: Date.now(), title: contractTitle, startDate: contractStartDate, endDate: contractEndDate, comments: contractComments});

    //     this.clearInputs();
    // }

    clearInputs() {
        this.setState = ({
            contractTitle: "",
            contractStartDate: "",
            contractEndDate: "",
            contractComments: ""
        });
    }

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }

    render() {
        const {profile} = this.props;

        return (
            <div>
                {/* edit modal popup*/}
                <div className="modal fade" id="profInfoModal" tabindex="-1" aria-labelledby="profInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="profInfoModalLabel">Edit Personal Information</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form className="row">
                                    <h2 className="info-header">Professional Identity</h2>

                                    <div className="col-6 mb-3">
                                        <label className="form-label">Collaborator Id:</label>
                                        <input onChange={(e) => this.onCollabIdChanged(e)} type="number" defaultValue={profile.collabId} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Labels/Tags:</label>
                                        <select value={profile.labelsAndTags} onChange={(e) => this.onLabelsAndTagsChanged(e)} className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="SH">SH</option>
                                            <option value="SH2">SH2</option>
                                            <option value="AN">AN</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work phone:</label>
                                        <input onChange={(e) => this.onWorkPhoneChanged(e)} type="number" defaultValue={profile.workPhone} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Work email:</label>
                                        <input onChange={(e) => this.onWorkEmailChanged(e)} type="email" defaultValue={profile.workEmail} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Covered Holidays</h2>

                                    <h2 className="info-header">Job Details</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Job:</label>
                                        <input onChange={(e) => this.onJobChanged(e)} type="text" defaultValue={profile.job} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Manager:</label>
                                        <input type="text" onChange={(e) => this.onManagerChanged(e)} defaultValue={profile.manager} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Salary Conditions</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Base salary:</label>
                                        <input onChange={(e) => this.onBaseSalaryChanged(e)} type="number" defaultValue={profile.baseSalary} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Expenses:</label>
                                        <input type="number" onChange={(e) => this.onExpensesChanged(e)} defaultValue={profile.expenses} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Meal allowance:</label>
                                        <input onChange={(e) => this.onMealAllowanceChanged(e)} type="number" defaultValue={profile.mealAllowance} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Flexible work hours:</label>
                                        <input type="number" onChange={(e) => this.onFlexibleWorkHrsChanged(e)} defaultValue={profile.flexibleWorkHrs} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Comments:</label>
                                        <input onChange={(e) => this.onCommentsChanged(e)} type="text" defaultValue={profile.comments} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Contracts</h2>
                                    <EditContracts profile={profile} />
                                    {/* <div className="mb-3">
                                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#addContract" aria-expanded="false" aria-controls="addContract">
                                            Add Contract
                                        </button>
                                        <div class="collapse" id="addContract">
                                            <div class="card card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label className="form-label">Title:</label>
                                                        <select value={contractTitle} onChange={(e) => this.onContractTitleChanged(e)} className="form-select">
                                                            <option value="">Choose...</option>
                                                            <option value="Full time, fixed term">Full time, fixed term</option>
                                                            <option value="Full time, unfixed term">Full time, unfixed term</option>
                                                            <option value="Part time, fixed term">Part time, fixed term</option>
                                                            <option value="Internship">Internship</option>
                                                            <option value="Freelance">Freelance</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 col-4">
                                                        <label className="form-label">Start date:</label>
                                                        <input type="date" onChange={(e) => this.onContractStartDateChanged(e)} defaultValue={contractStartDate} className="form-control"/>
                                                    </div>
                                                    <div className="mb-3 col-4">
                                                        <label className="form-label">End date:</label>
                                                        <input type="date" onChange={(e) => this.onContractEndDateChanged(e)} defaultValue={contractEndDate} className="form-control"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Comments:</label>
                                                        <input onChange={(e) => this.onContractCommentsChanged(e)} type="text" defaultValue={contractComments} className="form-control"/>
                                                    </div>

                                                    <button onClick={() => this.createContract()} className="btn btn-primary">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

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
