import React, { Component } from 'react'

export default class Account extends Component {

    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }
    
    render() {
        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%"}}>
                <h3 className="info-header mx-4">SUMMARY</h3>
                <div className="mx-4 mb-3">
                    <p>Access email: </p>
                    <p>Permission: </p>
                    <p>Status: </p>
                    <p>Language: </p>
                </div>
            </div>
        )
    }
}
