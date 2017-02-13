import React, { Component } from 'react';
import TopBanner from '../views/top-bar';
import Footer from '../views/footer';

export default class _ extends Component {
  render () {
    return (
      <div>
	<TopBanner/>
	{this.props.children}
	<Footer/>
      </div>
    );
  }
}
