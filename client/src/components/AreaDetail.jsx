import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class AreaDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      area: null,
      homes: null
    };
  }

  componentDidMount() {
    axios.get('/api/areadetails')
    .then(response => {
      this.setState({
        area: response.data[0][0]
      });
      console.log(this.state);
    });

    axios.get('/api/areahomes')
    .then(response => {
      this.setState({
        homes: [...response.data]
      });
    });
  }

  formatUrl(picture) {
    return '../../assets/photos/cities/' + picture;
  }

  handleBackClick() {
    browserHistory.push('/areas');
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
      <div className="homecard" key={index} onClick={this.handleHomeClick.bind(this, home)}>
        <h1>{home.address}</h1>
        <div className="homecard-info">
          <div>
            <div><i className="fa fa-money" aria-hidden="true"></i>${home.price}</div>
            <div><i className="fa fa-user" aria-hidden="true"></i>{home.people}</div>
            <div><i className="fa fa-bed" aria-hidden="true"></i>{home.beds}</div>
            <div><i className="fa fa-bath" aria-hidden="true"></i>{home.bathrooms}</div>
          </div>
          <div>
            <span>Access Full Home: {home.fullHome ? 'Yes' : 'No'}</span>
            <span>Private Room: {home.privateRoom ? 'Yes' : 'No'}</span>
            <span>Private Bath: {home.privateBath ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="areadetail-page">

        { this.state.area &&
          <div className="areadetail-first-col" style={{'backgroundImage': 'url(' + this.formatUrl.call(this, this.state.area.picture) + ')'}}>
          </div>
        }
        
        <div className="areadetail-second-col">
            { this.state.area &&
              <div>
                <div className="areadetail-page-title">
                  <h1>{this.state.area.city}</h1>
                  <button onClick={this.handleBackClick.bind(this)}>Back</button>
                </div>
          
                <div className="areadetail-page-description">
                  <p>{this.state.area.description}</p>
                </div>
              </div>
            }

          <div className="areadetailpage-homecards">
            <h1>Homes</h1>
            { this.state.homes &&
              this.state.homes.map(this.homesMap.bind(this))
            }
          </div>
        </div>

      </div>
    );
  }
}