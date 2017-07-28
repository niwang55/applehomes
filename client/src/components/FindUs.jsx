import React, { Component } from 'react';

export default class FindUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="findus-page">
        <h1>Find Us</h1>
        <p>Apple Homes is a home sharing company under Han Realty Inc.</p>
        <p>You can find more details about us at <a href="http://hanrealty.us">www.hanrealty.us</a></p>
        <p>Office located at 207 S. First Ave, Arcadia, CA 91007</p>
      </div>
    );
  }
}