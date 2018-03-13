import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Areas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areas: null
    };
  }

  componentDidMount() {
    axios.get('/api/areas')
    .then(response => {
      this.setState({
        areas: [...response.data]
      });
    });
  }

  formatUrl(picture) {
    return '../../assets/photos/cities/' + picture;
  }

  handleAreaClick(area) {
    axios.post('/api/currentarea', {
      area: area
    })
    .catch(error => {
      console.log('Error in posting to current area, ', error);
    });

    browserHistory.push('/areadetail');
  }

  render() {
    return (
      <div className="areas-page">
        <h1>Areas</h1>
        <div className="area-page-area-cards">
          { this.state.areas && 
            this.state.areas.map((area, index) => (
              <div style={{'backgroundImage': 'url(' + this.formatUrl.call(this, area.picture) + ')'}} className="area-card" key={index} onClick={this.handleAreaClick.bind(this, area.city)}>{area.city}</div>
            ))
          }
        </div>
      </div>
    );
  }
}