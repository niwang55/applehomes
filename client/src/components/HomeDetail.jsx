import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import axios from 'axios';

export default class HomeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: null,
      picturesArray: null,
      currentImage: 0
    };
  }

  componentWillMount() {
    // Get the details about the currently selected home
    axios.get('/api/homedetail')
    .then(response => {
      this.setState({
        home: response.data[0]
      });
    })
    .catch(error => {
      console.log('Error in getting home details from database, ', error);
    });

    // Get the pictures of the currently selected home
    axios.get('/api/homepictures')
    .then(response => {
      let picturesArray = [];
      response.data.resources.forEach(resource => {
        const pictureObject = {
          src: resource.url,
          width: resource.width,
          height: resource.height
        };

        picturesArray.push(pictureObject);
      });
      this.setState({
        picturesArray: [...picturesArray]
      });
      console.log(this.state);
    })
    .catch(error => {
      console.log('Error in getting home pictures, ', error);
    });
  }

  openLightbox(index, e) {
    e.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  render() {

    return (
      <div className="homedetail-page">

        { this.state.home &&
          <div className="homedetail-address">
            <h1>{this.state.home.address}</h1>
          </div>
        }

        <div className="homedetail-info">

          { this.state.home &&
            <div className="homedetail-details">

              <div>
                <h2>Accomodations</h2>
                <p>Price: ${this.state.home.price}/night</p>
                <p>Accomdates {this.state.home.people} people</p>
                <p>Bedrooms: {this.state.home.beds}</p>
                <p>Bathrooms: {this.state.home.bathrooms}</p>
                <p>Access to full home: {this.state.home.fullHome ? 'Yes' : 'No'}</p>
                <p>Bedroom: {this.state.home.privateRoom ? 'Private' : 'Shared'}</p>
                <p>Bathroom: {this.state.home.privateBath ? 'Private' : 'Shared'}</p>
              </div>

              <h3>Summary</h3>
              <p>{this.state.home.summary}</p>

              <h3>Description</h3>
              <p>{this.state.home.description}</p>

              <h3>Guest Access</h3>
              <p>{this.state.home.access}</p>

              <h3>The Neighborhood</h3>
              <p>{this.state.home.neighborhood}</p>

              <h3>Getting Around</h3>
              <p>{this.state.home.transportation}</p>

              <h3>Additional Notes</h3>
              <p>{this.state.home.notes}</p>

            </div>
          }

          { this.state.picturesArray &&
            <div className="homedetail-carousel">
              <h2>Gallery</h2>
              <Gallery photos={this.state.picturesArray} margin={5} onClickPhoto={this.openLightbox.bind(this)} />
              <Lightbox
                theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
                images={this.state.picturesArray}
                backdropClosesModal={true}
                onClose={this.closeLightbox.bind(this)}
                onClickPrev={this.gotoPrevious.bind(this)}
                onClickNext={this.gotoNext.bind(this)}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />

            </div>
          }

        </div>

      </div>
    );
  }
}