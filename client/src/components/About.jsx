import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.top-banner').addClass('about-nav');
  }

  componentWillUnmount() {
    $('.top-banner').removeClass('about-nav');
  }

  render() {
    return (
      <div className="about-page">

        <div className="first-row">
          <div className="first-row-text">
            <h1>Welcome to Apple Homes</h1>
            <p>scroll down for more <i className="fa fa-angle-down" aria-hidden="true"></i></p>
          </div>
        </div>

        <div className="second-row">
          <Link to="/homes"><div className="placard homes-placard">Homes</div></Link>
          <Link to="/areas"><div className="placard areas-placard">Areas</div></Link>
          <Link to="/findus"><div className="placard findus-placard">Find Us</div></Link>
        </div>

        <div className="third-row">
          <h1>About Us</h1>
          <p>Welcome to Apple Homes, serving the San Gabriel Valley area</p>
          <p>to help you find your dream vacation home</p>
        </div>

      </div>
    );
  }
}