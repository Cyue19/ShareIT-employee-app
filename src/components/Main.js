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
            console.log("SNAP HERE", snapShot);
            const docs = snapShot.docs;
            console.log(docs[0].data());
            const users = docs.map(doc => {return {userId: doc.data().userId, firstName: doc.data().firstName, lastName: doc.data().lastName, 
                job: doc.data().job, manager: doc.data().manager.fullName, picture: doc.data().picture}})
            this.setState({users})
        } catch(err) {
            console.log(err);
        }
    }

    // componentDidMount() {
    //     const myData = this.state.contacts
    //     .sort((a, b) => a.name.localeCompare(b.name))
    //     map((item, i) => <List key={i} data={item} />);
    // }

    render() {
        // //styling of text at top
        // const styleBackground = {
        //     color: "white",
        //     fontFamily: "Gilroy-Light",
        //     fontSize: "x-large",
            
        // }

        const {users} = this.state;

        return (
            // <div style={{ backgroundImage: 'url(${background1})'}}>
            //     <h1 className ="h3 mb-3 text-center" style={styleBackground}>Employees</h1>
            //     <ul> 
            //         {
            //             this.state.contacts.map((items, i) => <List key={i} data={item} />)
            //         }
            //     </ul>




            //     <p className="mt-5 mb-3 text-muted">Copyright © 2011-2021, Share IT and its related companies. All rights reserved.</p>
            // </div>
    // loop through the users and send 'user' information to Card component

      // get from user
  // name
  // position
  // manager
  // image

  // fetch all users from firebase
  // unpack user information (includes the image (downloadUrl for firebase storage))
  // set state (update users)
            <div>
                { users.map(user => 
                    <PropsRoute employee={user} component={Card}/>
                )}
            </div>
        )
    }
}

