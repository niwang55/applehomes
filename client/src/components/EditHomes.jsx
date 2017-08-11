import React, { Component } from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';

export default class NewHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homes: null
    };
  }

  componentWillMount() {
    axios.get('/api/homes')
    .then(response => {
      this.setState({
        homes: [...response.data],
      });
    });
  }

  handleDeleteClick(address) {
    const answer = confirm(`Are you sure you want to delete: ${address}?`);

    if (answer) {
      axios.post('/api/deletehome', { address: address })
      .then(response => {
        return axios.get('/api/homes');
      })
      .then(response => {
        this.setState({
          homes: [...response.data]
        });
      })
      .catch(error => {
        console.log('Error deleting home from database', error);
      });
    }
  }

  handleEditClick(address) {
    axios.post('/api/editinghome', { address: address })
    .then(response => {
      browserHistory.push('/edithome');
    });
  }

  homesMap(home, index) {
    return (
      <div key={index}>
        <p>
          {home.address}
          <button onClick={this.handleDeleteClick.bind(this, home.address)}>Delete</button>
          <button onClick={this.handleEditClick.bind(this, home.address)}>Edit</button>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="edithomes-page">
        <h2>This page is for authorized contributors to Apple Homes to delete listings <button><Link to="/useroptions">Back to options</Link></button></h2>

        <div className="edithomes-homes">
          {this.state.homes && 
            this.state.homes.map(this.homesMap.bind(this))
          }
        </div>
      </div>
    );
  }
}