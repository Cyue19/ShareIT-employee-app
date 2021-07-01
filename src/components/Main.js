import React, { Component } from 'react';
import './Main.css';


import Card from './Card';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  // get from user
  // name
  // position
  // manager
  // image

  // fetch all users from firebase
  // unpack user information (includes the image (downloadUrl for firebase storage))
  // set state (update users)

  render() {
    const styleBackground = {
        color: "white",
        fontFamily: "Gilroy-Light",
        fontSize: "x-large",
        
    }
    const { users } = this.state;
    console.log(users);
    return (
        //loop through the users and send 'user' information to Card component
        <div style={{background: "linear-gradient(to left, #3c817a, #19033d)", height: '100%', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h1 className ="h3 mb-3 text-center" style={styleBackground}>Employees</h1>

            <div>
                <Card />
            </div>
            <p className="mt-5 mb-3 text-muted">Copyright © 2011-2021, Share IT and its related companies. All rights reserved.</p>
        </div>
    );
  }
}
