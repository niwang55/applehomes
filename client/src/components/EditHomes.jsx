import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

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

  handleDelete(address) {
    axios.post('/api/deletehome', { address: address })
    .then(response => {
      console.log('before 2nd get');
      return axios.get('/api/homes');
    })
    .then(response => {
      console.log('after second get');
      this.setState({
        homes: [...response.data]
      });
      console.log(this.state);
    })
    .catch(error => {
      console.log('Error deleting home from database', error);
    });
  }

  homesMap(home, index) {
    return (
      <div key={index}>
        <p>{home.address} <button onClick={this.handleDelete.bind(this, home.address)}>Delete</button></p>
      </div>
    );
  }

  render() {
    return (
      <div className="edithomes-page">
        <h2>This page is for authorized contributors to Apple Homes to delete listings</h2>

        <div className="edithomes-homes">
          {this.state.homes && 
            this.state.homes.map(this.homesMap.bind(this))
          }
        </div>
      </div>
    );
  }
}