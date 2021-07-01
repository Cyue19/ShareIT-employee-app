import React, { Component } from 'react';
import './Main.css';


import Card from './Card';
import Firebase from "../firebase/Firebase";
import PropsRoute from "./PropsRoute";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.instance().db;
    
        this.state = {
          users: [],
        };
    }

    async componentDidMount() {
        try {
            const snapShot = await this.db.collection("profiles").get();
            const docs = snapShot.docs;
            console.log(docs[0].data());
            const users = docs.map(doc => {return {userId: doc.data().userId, firstName: doc.data().firstName, lastName: doc.data().lastName, 
                job: doc.data().job, manager: doc.data().manager.fullName, picture: doc.data().picture}})
            this.setState({users})
        } catch(err) {
            console.log(err);
        }
    }

  render() {
    const styleBackground = {
        color: "white",
        fontFamily: "Gilroy-Light",
    }
    const { users } = this.state;

    return (
        <div style={{position: "fixed", height: "100vh", width: "100vw", backgroundImage: "linear-gradient(to left, #3c817a, #19033d)", padding: "0% 12%"}}>
            <h2 className ="text-center mt-3" style={styleBackground}>Employees</h2>

            <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
            { users.map(user => 
                    <PropsRoute employee={user} component={Card}/>
                )}
            </div>
            <p style={{position: "absolute", bottom: "13%"}} className="mt-5 mb-3 text-muted">Copyright © 2011-2021, Share IT and its related companies. All rights reserved.</p>
        </div>
    );
  }
}

