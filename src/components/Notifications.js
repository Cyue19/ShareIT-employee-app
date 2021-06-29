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
                notifications: doc.data().notifications
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const {notifications} = this.state;

        return (
            <div>
                { notifications.map(notif =>
                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-body">
                            {notif}
                            <div className="mt-2 pt-2 border-top">
                                <button type="button" className="btn btn-primary btn-sm">Take action</button>
                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
