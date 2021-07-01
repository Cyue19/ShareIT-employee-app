import React, { Component } from 'react';
import Firebase from "../firebase/Firebase";

export default class Notifications extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;

        this.state = {
            notifications: []
        }
    }

    async componentDidMount() {
        try {
            const doc = await this.db.collection("profiles").doc(this.props.user.uid).get();
            this.setState({
                notifications: doc.data().notifications,
            });
        } catch(err) {
            console.log(err);
        }
    }

    viewUserProfile(Id) {
        const url = "/profile/" + Id;
        this.props.history.push(url);
    }

    async deleteNotification(id) {
        try {
            const updatedNotifs = this.state.notifications.filter(notif => notif.notifId !== id);
            await this.db.collection("profiles").doc(this.props.user.uid).update({
                notifications: updatedNotifs
            });

            this.setState({
                notifications: updatedNotifs
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const {notifications} = this.state;

        return (
            <div style={{height: "100%", position: "relative"}}>
            <div className="container mb-3" style={{position: "absolute", left: "15%", width: "70%"}}>
                <h2>My Notifications:</h2>
                <div className="card mb-3" style={{background: "linear-gradient(to bottom left, #3c817a, #19033d)"}}>
                    <div className="card-body" style={{padding: "20px 30px"}}>
                    { notifications.reverse().map(notif =>
                        <div className="card my-2">
                            <div className="card-body" style={{paddingBottom: "0px"}}>
                                <div className="row">
                                    <div className="col-10">
                                        {notif.message}
                                    </div>
                                    <div className=" col-2">
                                        <button onClick={() => this.viewUserProfile(notif.recipientId)} type="button" className="btn btn-primary btn-sm me-1">View profile</button>
                                        <button onClick={() => this.deleteNotification(notif.notifId)} type="button" className="btn btn-danger btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 pt-2 border-top">
                                    <p style={{fontSize: "15px", color: "lightgray", fontStyle:"italic"}}>Date: {new Date(notif.notifId).toString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
