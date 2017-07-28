import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import $ from 'jquery';

export default class Homes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homes: null,
      filteredHomes: null,
      areas: null,
      maxPeople: null,
      maxBeds: null,
      maxBathrooms: null,
      searchedAddress: '',
      maxPrice: '',
      selectedArea: '',
      selectedPeople: 0,
      selectedBeds: 0,
      selectedBathrooms: 0,
      selectedFullHome: '',
      selectedRoom: '',
      selectedBath: ''
    };
  }

  componentWillMount() {
    axios.get('/api/homes')
    .then(response => {
      this.setState({
        homes: [...response.data],
        filteredHomes: [...response.data]
      });

      this.getMaxs();
    })
    .catch(error => {
      console.log(error);
    });

    axios.get('/api/areas')
    .then(response => {
      this.setState({
        areas: [...response.data]
      });
    });
  }

  componentDidUpdate() {
    let windowHeight = $(window).height();
    let itemHeight = $('.home-page-homecards').height();

    if (itemHeight + 300 < windowHeight) {
      $('.home-page').css('height', '100vh');
    } else {
      $('.home-page').css('height', '');
    }
  }

  getMaxs() {
    let maxPeople = 0;
    let maxBeds = 0;
    let maxBathrooms = 0;

    this.state.homes.forEach(home => {
      if (home.people > maxPeople) {
        maxPeople = home.people;
      }

      if (home.beds > maxBeds) {
        maxBeds = home.beds;
      }

      if (home.bathrooms > maxBathrooms) {
        maxBathrooms = home.bathrooms;
      }
    });

    this.setState({
      maxPeople: maxPeople,
      maxBeds: maxBeds,
      maxBathrooms: maxBathrooms
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

  handleAddressFilter(e) {
    this.setState({
      searchedAddress: e.target.value.toLowerCase()
    }, () => {
      this.filter();
    });
  }

  handlePriceFilter(e) {
    this.setState({
      maxPrice: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleAreaFilter(e) {
    this.setState({
      selectedArea: e.target.value
    }, () => {
      this.filter();
    });
  }

  handlePeopleFilter(e) {
    this.setState({
      selectedPeople: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleBedsFilter(e) {
    this.setState({
      selectedBeds: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleBathroomsFilter(e) {
    this.setState({
      selectedBathrooms: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleFullHomeFilter(e) {
    this.setState({
      selectedFullHome: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleRoomFilter(e) {
    this.setState({
      selectedRoom: e.target.value
    }, () => {
      this.filter();
    });
  }

  handleBathFilter(e) {
    this.setState({
      selectedBath: e.target.value
    }, () => {
      this.filter();
    });
  }

  filter() {
    const filteredHomes = this.state.homes.filter(home => {

      let addressMatch = true;
      if (this.state.searchedAddress === '') {
        addressMatch = true;
      } else {
        addressMatch = home.address.toLowerCase().includes(this.state.searchedAddress);
      }

      let priceMatch = true;
      if (this.state.maxPrice === '') {
        priceMatch = true;
      } else {
        priceMatch = home.price <= parseInt(this.state.maxPrice);
      }

      let areaMatch = true;
      if (this.state.selectedArea === '') {
        areaMatch = true;
      } else {
        areaMatch = home.area === this.state.selectedArea;
      }

      let peopleMatch = home.people >= this.state.selectedPeople;

      let bedsMatch = home.beds >= this.state.selectedBeds;

      let bathroomsMatch = home.bathrooms >= this.state.selectedBathrooms;

      let fullHomeMatch = true;
      if (this.state.selectedFullHome === '') {
        fullHomeMatch = true;
      } else {
        fullHomeMatch = '' + home.fullHome === this.state.selectedFullHome;
      }

      let roomMatch = true;
      if (this.state.selectedRoom === '') {
        roomMatch = true;
      } else {
        roomMatch = '' + home.privateRoom === this.state.selectedRoom;
      }

      let bathMatch = true;
      if (this.state.selectedBath === '') {
        bathMatch = true;
      } else {
        bathMatch = '' + home.privateBath === this.state.selectedBath;
      }

      return addressMatch && priceMatch && areaMatch && peopleMatch && bedsMatch && bathroomsMatch && fullHomeMatch && roomMatch && bathMatch;
    });

    this.setState({
      filteredHomes: filteredHomes
    });
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
      <div className="home-page">

        <h1 className="home-page-title">Our Homes</h1>

        <h2>Filters</h2>
        <div className="home-page-filter">

          <div className="individual-filter">
            By address:
            <input type="text" onChange={this.handleAddressFilter.bind(this)} placeholder="Enter an address" />
          </div>

          <div className="individual-filter">
            By price: 
            <input type="number" onChange={this.handlePriceFilter.bind(this)} placeholder="Enter a maximum price" />
          </div>

          <div className="individual-filter">
            By area:
            <select onChange={this.handleAreaFilter.bind(this)} name="area-select">
              <option value=""></option>
              { this.state.areas &&
                this.state.areas.map((area, index) => (
                  <option key={index} value={area.city}>{area.city}</option>
                ))
              }
            </select>
          </div>

          <div className="individual-filter">
            By number of people:
            { this.state.maxPeople &&
                <input type="range" onChange={this.handlePeopleFilter.bind(this)} value={this.state.selectedPeople} min="0" max={this.state.maxPeople} />
            }
            {this.state.selectedPeople}
          </div>

          <div className="individual-filter">
            By number of beds:
            { this.state.maxBeds &&
                <input type="range" onChange={this.handleBedsFilter.bind(this)} value={this.state.selectedBeds} min="0" max={this.state.maxBeds} />
            }
            {this.state.selectedBeds}
          </div>

          <div className="individual-filter">
            By number of bathrooms:
            { this.state.maxBathrooms &&
                <input type="range" onChange={this.handleBathroomsFilter.bind(this)} value={this.state.selectedBathrooms} min="0" max={Math.ceil(this.state.maxBathrooms)} />
            }
            {this.state.selectedBathrooms}
          </div>

          <div className="individual-filter">
            By home type:
            <select onChange={this.handleFullHomeFilter.bind(this)} name="fullhome-select">
              <option value=""></option>
              <option value={true}>Full Home</option>
              <option value={false}>Private Room</option>
            </select>
          </div>

          <div className="individual-filter">
            By room type:
            <select onChange={this.handleRoomFilter.bind(this)} name="room-select">
              <option value=""></option>
              <option value={true}>Private Room</option>
              <option value={false}>Shared Room</option>
            </select>
          </div>

          <div className="individual-filter">
            By bathroom type:
            <select onChange={this.handleBathFilter.bind(this)} name="bath-select">
              <option value=""></option>
              <option value={true}>Private Bathroom</option>
              <option value={false}>Shared Bathroom</option>
            </select>
          </div>

        </div>

        <div className="home-page-homecards">
          { this.state.filteredHomes &&
            this.state.filteredHomes.map(this.homesMap.bind(this))
          }
        </div>

      </div>
    );
  }
}