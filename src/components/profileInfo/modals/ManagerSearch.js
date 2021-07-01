import React, { Component } from 'react';
import Firebase from "../../../firebase/Firebase";

export default class ManagerSearch extends Component {
    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;

        this.state = {
            userList: [],
            target: "",
            matches: []
        }
    }

    async componentDidMount() {
        await this.fetchAllUsersFromFirebase();
    }

    async fetchAllUsersFromFirebase() {
        try {
            const snapShot = await this.db.collection("profiles").get();
            const docs = snapShot.docs;
            const users = docs.map(doc => {return {firstName: doc.data().firstName, lastName: doc.data().lastName, userId: doc.data().userId}});
    
            this.setState({userList: users});
        } catch(err) {
            console.log(err);
        }
    }

    handleChange(e) {
        this.setState({
            target: e.target.value
        });

        if (this.state.target.length >= 1) {
            this.getMatches(this.state.target);
        }
    }

    getMatches(target) {
        for (const user of this.state.userList) {
            const fullName = user.firstName + " " + user.lastName;
            if (fullName.includes(target)) {
                this.state.matches.push({userId: user.userId, firstName: user.firstName, lastName: user.lastName})
            }
        }
    }

    selectOption(option) {
        this.setState({
            target: option.firstName + " " + option.lastName
        });
    }

    render() {
        const {matches} = this.state;

        return (
            <div className="mb-3">
                <label className="form-label">Manager:</label>
                <input type="text" onChange={(e) => this.handleChange(e)} name="manager" className="form-control"/>

                { matches ?
                    <ul>
                        {matches.map(match =>
                            <li onClick={() => this.selectOption(match)} key={match.userId}>{match.firstName} {match.lastName}</li>
                        )}
                    </ul>
                    :
                    <div></div>
                }
            </div>
        )
    }
}
