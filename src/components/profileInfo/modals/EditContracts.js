import React, { Component } from 'react'

export default class EditContracts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            startDate: "",
            endDate: "",
            comments: "",
            isEditing: false,
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clearInputs() {
        this.setState({
            title: "",
            startDate: "",
            endDate: "",
            comments: ""
        });
    }

    onAddContract() {
        const {title, startDate, endDate, comments} = this.state;
        this.props.profile.contracts.push({id: Date.now(), title: title, startDate: startDate, endDate: endDate, comments: comments});

        this.clearInputs();
    }

    onRemoveContract(id) {
        const updatedContracts = this.props.profile.contracts.filter(contract => contract.id !== id);
        this.props.profile.contracts = updatedContracts;
        this.setState({});
    }

    onUpdateContract(id) {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const {title, startDate, endDate, comments, isEditing} = this.state;
        const {profile} = this.props;

        return (
            <div className="mb-3">
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#addContract" aria-expanded="false" aria-controls="addContract">
                    + Add Contract
                </button>
                <div class="collapse" id="addContract">
                    <div class="card card-body">
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
                                <input onChange={(e) => this.handleChange(e)} type="text" name="comments" defaultValue={comments} className="form-control"/>
                            </div>

                            <button onClick={() => this.onAddContract()} type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>

                { profile.contracts.map(contract => 
                    <div class="card mt-2">
                    <h5 class="card-header">
                        { isEditing ?
                            <div>
                                <select value={contract.title} onChange={(e) => this.handleChange(e)} className="form-select">
                                    <option value="">Choose...</option>
                                    <option value="Full time, fixed term">Full time, fixed term</option>
                                    <option value="Full time, unfixed term">Full time, unfixed term</option>
                                    <option value="Part time, fixed term">Part time, fixed term</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>
                            :
                            <div>
                                {contract.title}
                                
                                <button onClick={() => this.onUpdateContract(contract.id)} style={{padding: "2px 6px"}} type="button" className="btn btn-primary mx-1">
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
                    <div class="card-body">
                        <p class="card-text">Dates: {contract.startDate.slice(8,)}/{contract.startDate.slice(5,7)}/{contract.startDate.slice(0,4)} - {contract.endDate.slice(8,)}/{contract.endDate.slice(5,7)}/{contract.endDate.slice(0,4)}</p>
                        <p class="card-text">Comments: {contract.comments}</p>
                    </div>
                    </div>
                )}
            </div>
        );
    }
}
