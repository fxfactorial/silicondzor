import React, { Component } from 'react';
import colors from './colors';

const bottom_s = {
  color:'white',
  position:'absolute',
  // Great use of calc
  width:`calc(100% - 40px)`,
  bottom:0,
  marginBottom:'10px',
  backgroundColor:colors.site_colors.a
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
