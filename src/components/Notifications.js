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
            <div className="container">
                My Notifications:
                { notifications.map(notif =>
                    <div className="card">
                        <div className="card-body">
                            {notif.message}
                            <div className="mt-2 pt-2 border-top">
                                <button onClick={() => this.viewUserProfile(notif.recipientId)} type="button" className="btn btn-primary btn-sm">View profile</button>
                                <button onClick={() => this.deleteNotification(notif.notifId)} type="button" className="btn btn-secondary btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
