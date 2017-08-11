import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';

export default class UserOptions extends Component {
  constructor(props) {
    super(props);
  }

  handleLogoutClick() {
    axios.get('/api/logout')
    .catch(error => {
      console.log('Error in logging out', error);
    });

    browserHistory.push('/login');
  }

  render() {
    return (
      <div className="useroptions-page">
        <h1>Choose an option below:</h1>
        <div className="useroptions-page-buttons">
          <Link to="/newhome"><button className="general-button">Upload a new listing</button></Link>
          <Link to="/edithomes"><button className="general-button">Edit/Delete a listing</button></Link>
          <button className="general-button" onClick={this.handleLogoutClick.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}