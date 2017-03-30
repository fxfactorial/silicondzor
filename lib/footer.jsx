import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import colors from './colors';

const bottom_s = {
  paddingBottom:'10px'
};

const bar_s = {
  marginLeft:'20px',
  marginRight:'20px',
  backgroundColor:colors.site_colors.banner,
  height:'10px'
};

const footer_row = {
  marginTop:'10px',
  display:'flex',
  justifyContent:'center'
};

const grouping_s = {
  display:'inline-flex',
  width:'220px',
  justifyContent:'space-between'
};

export default class Footer extends Component {
  render () {
    return (
      <footer style={bottom_s}>
        <div style={bar_s}/>
        <section style={footer_row}>

          <section style={grouping_s}>
            <Link to={'/guidelines'}>Guidelines</Link> |
            <Link to={'/faq'}>FAQ</Link> |
            <a href={'https://github.com/fxfactorial/silicondzor'}>Source code</a>
          </section>

        </section>

        <section style={footer_row}>
          <p style={{marginRight:'5px'}}>Search:</p>
          <input type={'search'}/>
        </section>
      </footer>
    );
  }
};
