import React, { Component } from 'react';
import axios from 'axios';

export default class Areas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homes: null,
      areas: null
    };
  }

  componentWillMount() {
    axios.get('/api/homes')
    .then(response => {
      this.setState({
        homes: [...response.data]
      });

      let cityObject = {};
      this.state.homes.forEach(home => {
        let city = home.area;

        cityObject[city] ? cityObject[city]++ : cityObject[city] = 1;
      });

      this.setState({
        areas: cityObject
      });

    });
  }

  areasMap(area, index) {
    return (
      <div key={index}>{area} <span>Number of Properties: {this.state.areas[area]}</span></div>
    );
  }

  render() {
    return (
      <div>
        <h1>Areas</h1>
        <h3>Here are a list of the areas where we have listings</h3>
        { this.state.areas && 
          Object.keys(this.state.areas).map(this.areasMap.bind(this))
        }
      </div>
    );
  }
}