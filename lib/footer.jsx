import React, { Component } from 'react';

const bottom_s = {
  position:'absolute',
  bottom:0,
  marginBottom:'10px',
  backgroundColor:'orange'
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
