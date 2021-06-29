import React, { Component } from 'react';
import './Card.css';

import img from '../img/img1.jpeg';

export default class Card extends Component {

  render() {
    const { name, job, manager } = this.props;

    return (
      <div className="Card">
        <div className="upper-container" align="center">
          <div className="image-container">
            <img src={img} alt="Employee1image" height="100px" width="100px" />
          </div>
        </div>
        <div className="lower-container" align="center">
          <h3> {name}</h3>
          <h4> {job}</h4>
          <h5> {manager}</h5>
          <button> View Profile</button>
        </div>
      </div>
    );
  }
}
