import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

export default class UserOptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="useroptions-page">
        <h1>Choose an option below:</h1>
        <div className="useroptions-page-buttons">
          <button className="general-button"><Link to="/newhome">Upload a new listing</Link></button>
          <button className="general-button"><Link to="/edithomes">Delete a listing</Link></button>
          <button className="general-button">Upload an area (Not working yet)</button>
        </div>
      </div>
    );
  }
}