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
      <div className="Card">
        <div className="upper-container" align="center">
          <div className="image-container">
            <img src={employee.picture} className="card-image" alt="Employee1image" height="100px" width="100px" />
          </div>
        </div>
        <div className="lower-container" align="center">
          <h3>{employee.firstName} {employee.lastName}</h3>
          <h4>{employee.job}</h4>
          <h5>{employee.manager.fullName}</h5>
          <button className="card-button" onClick={() => this.goToProfile(employee.userId)}> View Profile</button>
        </div>
      </div>
    );
  }
}
