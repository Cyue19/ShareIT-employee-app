import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {

  goToProfile(id) {
    const url = "/profile/" + id;
    this.props.history.push(url);
  }

  render() {
    const { employee } = this.props;

    return (
      <div className="Card col-3 mx-4">
        <div className="upper-container" align="center">
          <div className="image-container">
            <img src={employee.picture} className="card-image" alt="profile" height="70px" width="70px" />
          </div>
        </div>
        <div className="lower-container" align="center">
          <h3>{employee.firstName} {employee.lastName}</h3>
          <h4>{employee.job}</h4>
          <h5>{employee.manager}</h5>
          <button className="card-button" onClick={() => this.goToProfile(employee.userId)}> View Profile</button>
        </div>
      </div>
    );
  }
}
