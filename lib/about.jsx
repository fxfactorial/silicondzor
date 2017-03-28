import React, { Component } from 'react';

const s = {

};

const names = [
  {name: 'Edgar Aroutiounian', img:'/edgar-arout.jpg'},
  {name: 'Edgar Khanzadian', img:'/edgar-khan.jpg'},
  // {name: 'Robert Gevorgyan', img:'/robert.png'}
];

const profiles_cont = {
  display:'flex',
  justifyContent:'space-between',
  marginLeft:'3rem',
  marginRight:'3rem'
};

const profiles = names.map(({name, img}) => (
  <div key={name} style={{textAlign:'center'}}>
    <img style={{borderRadius:'10px'}} src={img}/>
    <p>{name}</p>
  </div>
));

export default class Resquared extends Component {
  render () {
    return (
      <div>
        <section>
          Contact us to work on your next software project.
        </section>
        <section style={profiles_cont}>
          {profiles}
        </section>
      </div>
    );
  }
}
