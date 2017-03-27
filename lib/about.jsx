import React, { Component } from 'react';

const s = {

};

const names = [
  {name: 'Edgar Aroutiounian', img:'/edgar-arout.png'},
  {name: 'Edgar Khanzandian', img:'/edgar-khan.png'},
  {name: 'Robert Gevorgyan', img:'/robert.png'}
];

const profiles = names.map(({name, img}) => (
  <p key={name}>
    {name} <img src={img}/>
  </p>
));

export default class Resquared extends Component {
  render () {
    return (
      <div>
        <section>
          Contact us for rates
        </section>
        <section style={{display:'flex'}}>
          {profiles}
        </section>
      </div>
    );
  }
}
