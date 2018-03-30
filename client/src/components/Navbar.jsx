import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="top-banner">
          <h1>Apple Homestay</h1>
          <nav className="navbar">
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/homes'>Homes</Link></li>
            <li><Link to='/areas'>Areas</Link></li>
            <li><Link to='/findus'>Find Us</Link></li>
            <li><Link to='/login'>Agent Login</Link></li>
          </nav>
        </div>

        { this.props.children }
        
      </div>
    );
  }
}