import React, { Component } from 'react';
import colors from './colors';

// Maybe don't need a fixed footer.
const bottom_s = {
  color:'white',
  position:'absolute',
  // Great use of calc
  width:`calc(100% - 40px)`,
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
