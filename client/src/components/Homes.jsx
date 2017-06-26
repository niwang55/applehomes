import React, { Component } from 'react';
import axios from 'axios';

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

  homesMap(home, index) {
    return (
      <div key={index}>{home.address}</div>
    );
  }

  render() {
    return (
      <div>
        <h1>Homes</h1>
        { this.state.homes &&
          this.state.homes.map(this.homesMap.bind(this))
        }
      </div>
    );
  }
}