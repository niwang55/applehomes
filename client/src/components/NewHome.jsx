import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class NewHome extends Component {
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
      privateBath: null,
      picturesArray: null
    };
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

  onDrop(files) {
    this.setState({
      picturesArray: files
    });
  }

  handleSubmitClick(e) {
    e.preventDefault();

    // Upload home to server/mongo
    axios.post('/api/homes', this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('Error in posting homes', error);
    });

    // Upload picture and convert to base64 for cloudinary
    this.state.picturesArray.forEach(pictureFile => {
      var reader = new FileReader();
      reader.onloadend = this.processFile.bind(this);
      reader.readAsDataURL(pictureFile);
    });
  }

  processFile(e) {
    axios.post('/api/homepictures', {
      address: this.state.address,
      file64: e.target.result
    })
    .catch(error => {
      console.log('Error in posting to homePictures', error);
    });
  }

  render() {
    return (
      <div className="newhome-page">

      <h3>This form is for authorized contributors to Apple Homes to add new listings</h3>

        <div className="newhome-form">

          <input onChange={this.handleAddressChange.bind(this)} type="text" placeholder="address" />
          <input onChange={this.handleLinkChange.bind(this)} type="text" placeholder="AirBnB link" />
          <textarea onChange={this.handleSummaryChange.bind(this)} rows="10" placeholder="summary" />
          <textarea onChange={this.handleDescriptionChange.bind(this)} rows="10" placeholder="description" />
          <textarea onChange={this.handleAccessChange.bind(this)} rows="10" placeholder="access" />
          <textarea onChange={this.handleNeighborhoodChange.bind(this)} rows="10" placeholder="neighborhood" />
          <textarea onChange={this.handleTransportationChange.bind(this)} rows="10" placeholder="transportation" />
          <textarea onChange={this.handleNotesChange.bind(this)} rows="10" placeholder="notes" />
          <input onChange={this.handleAreaChange.bind(this)} type="text" placeholder="area/city" />

          <div className="single-line-form">
            <input onChange={this.handlePriceChange.bind(this)} type="text" placeholder="price" />
            <input onChange={this.handlePeopleChange.bind(this)} type="text" placeholder="people" />
            <input onChange={this.handleBedsChange.bind(this)} type="text" placeholder="beds" />
            <input onChange={this.handleBedroomsChange.bind(this)} type="text" placeholder="bedrooms" />
            <input onChange={this.handleBathroomsChange.bind(this)} type="text" placeholder="bathrooms" />
          </div>

          <div className="radio-form">
            Full Home?
            <input onChange={this.handleFullHomeChange.bind(this)} type="radio" value="true" name="fullhome" />
            <label htmlFor="true">Yes</label>
            <input onChange={this.handleFullHomeChange.bind(this)} type="radio" value="false" name="fullhome" />
            <label htmlFor="false">No</label>
          </div>
          <div className="radio-form">
            Private Room?
            <input onChange={this.handlePrivateRoomChange.bind(this)} type="radio" value="true" name="privateroom" />
            <label htmlFor="true">Yes</label>
            <input onChange={this.handlePrivateRoomChange.bind(this)} type="radio" value="false" name="privateroom" />
            <label htmlFor="false">No</label>
          </div>
          <div className="radio-form">
            Private Bath?
            <input onChange={this.handlePrivateBathChange.bind(this)} type="radio" value="true" name="privatebath" />
            <label htmlFor="true">Yes</label>
            <input onChange={this.handlePrivateBathChange.bind(this)} type="radio" value="false" name="privatebath" />
            <label htmlFor="false">No</label>
          </div>

          <Dropzone className="file-uploader" onDrop={this.onDrop.bind(this)}>
              <div>Drag pictures or click to upload</div>
              <i className="fa fa-upload fa-3x" aria-hidden="true"></i>
          </Dropzone>

          { this.state.picturesArray && 
            <div>
              Files to upload:
              { this.state.picturesArray.map((file, index) => (
                <div key={index}>{file.name}</div>
              ))}
            </div>

          }

          <button onClick={this.handleSubmitClick.bind(this)} className="general-button">Submit</button>

        </div>

      </div>
    );
  }
}