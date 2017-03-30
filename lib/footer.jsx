import React, { Component } from 'react';
import colors from './colors';

const bottom_s = {
  marginTop:'20px',
  color:'white',
  width:`100%`,
  bottom:0,
  marginBottom:'10px',
  backgroundColor:colors.site_colors.banner
};

export default class Footer extends Component {
  render () {
    return (
      <footer style={bottom_s}>
	      Should be bottom footer
      </footer>
    );
  }
};
