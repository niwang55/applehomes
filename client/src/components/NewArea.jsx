import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class NewArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="newarea-page">
        <h2>This page is for authorized contributors to Apple Homes to upload an area <button><Link to="/useroptions">Back to options</Link></button></h2>
      </div>
    );
  }
}