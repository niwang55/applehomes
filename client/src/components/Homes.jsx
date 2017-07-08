import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Homes extends Component {
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
        homes: [...response.data]
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleHomeClick(home) {
    axios.post('/api/currenthome', {
      address: home.address
    })
    .catch(error => {
      console.log('Error in posting to current home', error);
    });

    browserHistory.push('/homedetail');
  }

  homesMap(home, index) {
    return (
      <div key={index} onClick={this.handleHomeClick.bind(this, home)}>{home.address}</div>
    );
  }

  render() {
    return (
      <div className="home-page">
        <h1>Homes</h1>
        { this.state.homes &&
          this.state.homes.map(this.homesMap.bind(this))
        }
      </div>
    );
  }
}