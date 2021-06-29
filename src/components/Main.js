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
    const { users } = this.state;
    console.log(users);
    return (
      // loop through the users and send 'user' information to Card component
      <div>
        <Card />
      </div>
    );
  }
}
