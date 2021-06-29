import React, { Component } from 'react';
// import ManagerSearch from "./ManagerSearch";
import Firebase from "../../../firebase/Firebase"

export default class ProfessionalEditModal extends Component {
    
    constructor(props) {
        super(props);
        this.contractsCopy = JSON.parse(JSON.stringify(props.profile.contracts));
        this.db = Firebase.instance().db;

        this.state = {
            collabId: props.profile.collabId,
            labelsAndTags: props.profile.labelsAndTags,
            workPhone: props.profile.workPhone,
            workEmail: props.profile.workEmail,
            job: props.profile.job,
            managerName: props.profile.manager.fullName,
            managerId: props.profile.manager.userId,
            baseSalary: props.profile.baseSalary,
            expenses: props.profile.expenses,
            mealAllowance: props.profile.mealAllowance,
            flexibleWorkHrs: props.profile.flexibleWorkHrs,
            comments: props.profile.comments,
            title: "",
            startDate: "",
            endDate: "",
            contractComments: "",
            editTitle: "",
            editStartDate: "",
            editEndDate: "",
            editComments: "",
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async findManager() {
        try {
            if (this.state.managerName.length===0) {
                return;
            }

            const spaceIndex = this.state.managerName.indexOf(" ");
            if (spaceIndex < 0) {
                return;
            } else {
                const firstName = this.state.managerName.slice(0, spaceIndex);
                const lastName = this.state.managerName.slice(spaceIndex+1,);
                console.log(firstName, lastName);

                const snapShot = await this.db.collection("profiles").where("firstName", "==", firstName).where("lastName", "==", lastName).get();
                const doc = snapShot.docs[0];
                console.log(doc.data().firstName, doc.data().lastName, doc.data().userId);

                this.setState({
                    managerId: doc.data().userId
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    /**Add contract in edit modal display */
    onAddContract() {
        const {title, startDate, endDate, contractComments} = this.state;
        console.log(title, contractComments);
        this.contractsCopy.push({id: Date.now(), title: title, startDate: startDate, endDate: endDate, comments: contractComments, isEditing: false});
        this.setState({});

        this.clearInputs();
    }

    /**Remove contract in edit modal display */
    onRemoveContract(id) {
        const updatedContracts = this.contractsCopy.filter(contract => contract.id !== id);
        this.contractsCopy = updatedContracts;
        this.setState({});
    }

    /**Reflect contract edits in edit modal */
    onUpdateContract(contract) {
        contract.isEditing = !contract.isEditing;

        if (!contract.isEditing) {
            contract = {id: contract.id, title: this.state.editTitle, startDate: this.state.editStartDate, endDate: this.state.editEndDate, comments: this.state.editComments};
            const updatedContracts = this.contractsCopy.map(x => (x.id === contract.id) ? contract : x);
            this.contractsCopy = updatedContracts;
        } else {
            this.setState({
                editTitle: contract.title
            });
        }
    }

    /**Clear add contract form inputs */
    clearInputs() {
        this.setState({
            title: "",
            startDate: "",
            endDate: "",
            contractComments: "",
        });
    }

    /**Clear unsaved changes to contracts sections*/
    clearUnsavedContracts() {
        this.contractsCopy = JSON.parse(JSON.stringify(this.props.profile.contracts));
        this.setState({});
    }

    /**Save changes on edit modal display to profile page and firebase */
    async saveChanges(e) {
        e.preventDefault();
        const {profile} = this.props;

        if(this.state.managerName !== profile.manager.fullName) {
            await this.findManager();
        }

        profile.collabId = this.state.collabId;
        profile.labelsAndTags = this.state.labelsAndTags;
        profile.workPhone = this.state.workPhone;
        profile.workEmail = this.state.workEmail;
        profile.job = this.state.job;
        profile.manager = {fullName: this.state.managerName, userId: this.state.managerId};
        profile.baseSalary = this.state.baseSalary;
        profile.expenses = this.state.expenses;
        profile.mealAllowance = this.state.mealAllowance;
        profile.flexibleWorkHrs = this.state.flexibleWorkHrs;
        profile.comment = this.state.comment;
        profile.contracts = JSON.parse(JSON.stringify(this.contractsCopy));

        this.props.update(profile);
        this.setState({});
    }

    render() {
        const {profile} = this.props;
        const {title, startDate, endDate, contractComments, editTitle} = this.state;

        return (
            <div>
                {/* edit modal popup*/}
                <div className="modal fade" id="profInfoModal" aria-labelledby="profInfoModalLabel" aria-hidden="true">
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
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="collabId" defaultValue={profile.collabId} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Labels/Tags:</label>
                                        <select value={profile.labelsAndTags} onChange={(e) => this.handleChange(e)} name="labelsAndTags" className="form-select">
                                            <option value="">Choose...</option>
                                            <option value="SH">SH</option>
                                            <option value="SH2">SH2</option>
                                            <option value="AN">AN</option>
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Work phone:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="workPhone" defaultValue={profile.workPhone} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Work email:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="email" name="workEmail" defaultValue={profile.workEmail} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Covered Holidays</h2>

                                    <h2 className="info-header">Job Details</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Job:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="job" defaultValue={profile.job} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Manager full name (first and last):</label>
                                        <input type="text" onChange={(e) => this.handleChange(e)} name="managerName" defaultValue={this.state.managerName} className="form-control"/>
                                    </div>
                                    {/* <ManagerSearch profile={profile} modalChange={(e) => this.handleChange(e)}/> */}

                                    <h2 className="info-header">Salary Conditions</h2>
                                    <div className=" col-6 mb-3">
                                        <label className="form-label">Base salary:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="baseSalary" defaultValue={profile.baseSalary} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Expenses:</label>
                                        <input type="number" onChange={(e) => this.handleChange(e)} name="expenses" defaultValue={profile.expenses} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Meal allowance:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="number" name="mealAllowance" defaultValue={profile.mealAllowance} className="form-control"/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Flexible work hours:</label>
                                        <input type="number" onChange={(e) => this.handleChange(e)} name="flexibleWorkHrs" defaultValue={profile.flexibleWorkHrs} className="form-control"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Comments:</label>
                                        <input onChange={(e) => this.handleChange(e)} type="text" name="comments" defaultValue={profile.comments} className="form-control"/>
                                    </div>

                                    <h2 className="info-header">Contracts</h2>
                                    <div>
                                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#addContract" aria-expanded="false" aria-controls="addContract">
                                            + Add Contract
                                        </button>
                                        <div className="collapse" id="addContract">
                                            <div className="card card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label className="form-label">Title:</label>
                                                        <select value={title} onChange={(e) => this.handleChange(e)} name="title" className="form-select">
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
                                                        <input type="date" onChange={(e) => this.handleChange(e)} name="startDate" defaultValue={startDate} className="form-control"/>
                                                    </div>
                                                    <div className="mb-3 col-4">
                                                        <label className="form-label">End date:</label>
                                                        <input type="date" onChange={(e) => this.handleChange(e)} name="endDate" defaultValue={endDate} className="form-control"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Comments:</label>
                                                        <input onChange={(e) => this.handleChange(e)} type="text" name="contractComments" defaultValue={contractComments} className="form-control"/>
                                                    </div>

                                                    <button onClick={() => this.onAddContract()} type="button" className="btn btn-primary">Add</button>
                                                </div>
                                            </div>
                                        </div>

                                        { this.contractsCopy.map(contract => 
                                            <div style={{padding: "0px"}} className="card mt-2">
                                                <h5 className="card-header">
                                                    { contract.isEditing ?
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <select value={editTitle} onChange={(e) => this.handleChange(e)} name="editTitle" className="form-select">
                                                                    <option value="">Choose...</option>
                                                                    <option value="Full time, fixed term">Full time, fixed term</option>
                                                                    <option value="Full time, unfixed term">Full time, unfixed term</option>
                                                                    <option value="Part time, fixed term">Part time, fixed term</option>
                                                                    <option value="Internship">Internship</option>
                                                                    <option value="Freelance">Freelance</option>
                                                                </select>
                                                            </div>
                                                            <button onClick={() => this.onUpdateContract(contract)} type="button" className="btn btn-primary col-2">Done</button>
                                                        </div>
                                                        :
                                                        <div>
                                                            {contract.title}
                                                            
                                                            <button onClick={() => this.onUpdateContract(contract)} style={{padding: "2px 6px"}} type="button" className="btn btn-primary mx-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => this.onRemoveContract(contract.id)} style={{padding: "2px 6px"}} type="button" className="btn btn-danger">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    }
                                                        
                                                </h5>
                                                <div className="card-body">
                                                    { contract.isEditing ?
                                                        <div className="row">
                                                            <div className="mb-3 col-6">
                                                                <label className="form-label">Start date:</label>
                                                                <input type="date" onChange={(e) => this.handleChange(e)} name="editStartDate" defaultValue={contract.startDate} className="form-control"/>
                                                            </div>
                                                            <div className="mb-3 col-6">
                                                                <label className="form-label">End date:</label>
                                                                <input type="date" onChange={(e) => this.handleChange(e)} name="editEndDate" defaultValue={contract.endDate} className="form-control"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Comments:</label>
                                                                <input onChange={(e) => this.handleChange(e)} type="text" name="editComments" defaultValue={contract.comments} className="form-control"/>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div>
                                                            <p class="card-text">Dates: {contract.startDate.slice(8,)}/{contract.startDate.slice(5,7)}/{contract.startDate.slice(0,4)} - {contract.endDate.slice(8,)}/{contract.endDate.slice(5,7)}/{contract.endDate.slice(0,4)}</p>
                                                            <p class="card-text">Comments: {contract.comments}</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.clearUnsavedContracts()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={(e) => this.saveChanges(e)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}