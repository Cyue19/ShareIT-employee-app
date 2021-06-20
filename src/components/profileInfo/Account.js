import React, { Component } from 'react'

export default class Account extends Component {
    render() {
        return (
            <div className="form-card" style={{backgroundColor: "white"}}>
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
