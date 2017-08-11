import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class EditSingleHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null,
      link: null,
      summary: null,
      description: null,
      access: null,
      neighborhood: null,
      transportation: null,
      notes: null,
      area: null,
      price: null,
      people: null,
      beds: null,
      bedrooms: null,
      bathrooms: null,
      fullHome: null,
      privateRoom: null,
      privateBath: null
    };
  }

  componentWillMount() {
    axios.get('/api/editinghome')
    .then(response => {
      this.setState({
        address: response.data.address,
        link: response.data.link,
        summary: response.data.summary,
        description: response.data.description,
        access: response.data.access,
        neighborhood: response.data.neighborhood,
        transportation: response.data.transportation,
        notes: response.data.notes,
        area: response.data.area,
        price: response.data.price,
        people: response.data.people,
        beds: response.data.beds,
        bedrooms: response.data.bedrooms,
        bathrooms: response.data.bathrooms,
        fullHome: response.data.fullHome,
        privateRoom: response.data.privateRoom,
        privateBath: response.data.privateBath
      });
    });
  }

  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    });
  }

  handleLinkChange(e) {
    this.setState({
      link: e.target.value
    });
  }

  handleSummaryChange(e) {
    this.setState({
      summary: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleAccessChange(e) {
    this.setState({
      access: e.target.value
    });
  }

  handleNeighborhoodChange(e) {
    this.setState({
      neighborhood: e.target.value
    });
  }

  handleTransportationChange(e) {
    this.setState({
      transportation: e.target.value
    });
  }

  handleNotesChange(e) {
    this.setState({
      notes: e.target.value
    });
  }

  handleAreaChange(e) {
    this.setState({
      area: e.target.value
    });
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value
    });
  }

  handlePeopleChange(e) {
    this.setState({
      people: e.target.value
    });
  }

  handleBedsChange(e) {
    this.setState({
      beds: e.target.value
    });
  }

  handleBedroomsChange(e) {
    this.setState({
      bedrooms: e.target.value
    });
  }

  handleBathroomsChange(e) {
    this.setState({
      bathrooms: e.target.value
    });
  }

  handleFullHomeChange(e) {
    this.setState({
      fullhome: e.target.value === 'true'
    });
  }

  handlePrivateRoomChange(e) {
    this.setState({
      privateroom: e.target.value === 'true'
    });
  }

  handlePrivateBathChange(e) {
    this.setState({
      privatebath: e.target.value === 'true'
    });
  }

  handleSubmitClick(e) {
    e.preventDefault();

    axios.post('/api/updatehome', this.state)
    .catch(error => {
      console.log('Error in updating home', error);
    });

    alert('Home updated');
    browserHistory.push('/useroptions');
  }

  render() {
    return (
      <div className="editsinglehome-page">
        { this.state.address &&
          <div>
            <h1>Editing: {this.state.address}</h1>
            <h3>There is no way to change the address, if you want to change the address, delete a listing and relist it.</h3>
            <div className="newhome-form">

              AirBnB Link: <input value={this.state.link} onChange={this.handleLinkChange.bind(this)} type="text" />
              Summary: <textarea value={this.state.summary} onChange={this.handleSummaryChange.bind(this)} rows="10" />
              Description: <textarea value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} rows="10" />
              Access: <textarea value={this.state.access} onChange={this.handleAccessChange.bind(this)} rows="10" />
              Neighborhood: <textarea value={this.state.neighborhood} onChange={this.handleNeighborhoodChange.bind(this)} rows="10" />
              Transportation: <textarea value={this.state.transportation} onChange={this.handleTransportationChange.bind(this)} rows="10" />
              Notes: <textarea value={this.state.notes} onChange={this.handleNotesChange.bind(this)} rows="10" />
              Area: <input value={this.state.area} onChange={this.handleAreaChange.bind(this)} type="text" />

              <div className="single-line-form">
                Price: <input value={this.state.price} onChange={this.handlePriceChange.bind(this)} type="text" />
                People: <input value={this.state.people} onChange={this.handlePeopleChange.bind(this)} type="text" />
                Beds: <input value={this.state.beds} onChange={this.handleBedsChange.bind(this)} type="text" />
                Bedrooms: <input value={this.state.bedrooms} onChange={this.handleBedroomsChange.bind(this)} type="text" />
                Bathrooms: <input value={this.state.bathrooms} onChange={this.handleBathroomsChange.bind(this)} type="text" />
              </div>

              <div className="radio-form">
                Full Home?
                <input onChange={this.handleFullHomeChange.bind(this)} type="radio" value="true" name="fullhome" checked={this.state.fullHome ? 'checked' : ''} />
                <label htmlFor="true">Yes</label>
                <input onChange={this.handleFullHomeChange.bind(this)} type="radio" value="false" name="fullhome" checked={this.state.fullHome ? '' : 'checked'} />
                <label htmlFor="false">No</label>
              </div>
              <div className="radio-form">
                Private Room?
                <input onChange={this.handlePrivateRoomChange.bind(this)} type="radio" value="true" name="privateroom" checked={this.state.privateRoom ? 'checked' : ''} />
                <label htmlFor="true">Yes</label>
                <input onChange={this.handlePrivateRoomChange.bind(this)} type="radio" value="false" name="privateroom" checked={this.state.privateRoom ? '' : 'checked'} />
                <label htmlFor="false">No</label>
              </div>
              <div className="radio-form">
                Private Bath?
                <input onChange={this.handlePrivateBathChange.bind(this)} type="radio" value="true" name="privatebath" checked={this.state.privateBath ? 'checked' : ''} />
                <label htmlFor="true">Yes</label>
                <input onChange={this.handlePrivateBathChange.bind(this)} type="radio" value="false" name="privatebath" checked={this.state.privateBath ? '' : 'checked'} />
                <label htmlFor="false">No</label>
              </div>


              <button onClick={this.handleSubmitClick.bind(this)} className="general-button">Update</button>

            </div>
          </div>
        }
      </div>
    );
  }
}