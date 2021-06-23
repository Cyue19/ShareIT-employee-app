import React, { Component } from 'react';
import ShowIf from "../ShowIf";

export default class Absences extends Component {
    
    saveChanges() {
        this.props.update(this.props.profile);
        this.setState({});
    }

    render() {
        return (
            <div className="form-card" style={{backgroundColor: "white", width:"100%", position: "relative"}}>
                <ShowIf isTrue={this.props.self}>
                    <button type="button" className="btn btn-primary col-1" style={{position: "absolute", left: "88%", top: ".5%"}} data-bs-toggle="modal" data-bs-target="#personalInfoModal">
                    Edit
                    </button>
                </ShowIf>
            </div>
        )
    }
}
