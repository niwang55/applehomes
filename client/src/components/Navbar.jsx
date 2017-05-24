import React, { Component } from 'react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <nav class="navbar">
          <li>About</li>
          <li>Areas</li>
          <li>Book Now</li>
          <li>Gallery</li>
          <li>Blog</li>
          <li>Find us</li>
        </nav>
      </div>
    );
  }
}