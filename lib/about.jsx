import React, { Component } from 'react';

const s = {

};

// Should come from a query
const names = [

  {name: 'Edgar Aroutiounian',
   descr:'Founder - Truly full stack developer',
   origin:'Raised in America',
   img:'/edgar-arout.jpg'},

  {name: 'Edgar Khanzadian',
   descr:'Founder - Straight outta Stalingrad',
   origin:'Raised in Russia',
   img:'/edgar-khan.jpg'},

  // {name: 'Robert Gevorgyan', img:'/robert.png'}
];

const profiles_cont = {
  marginTop:'1rem',
  display:'flex',
  justifyContent:'space-between',
  marginLeft:'3rem',
  marginRight:'3rem'
};

const profiles = names.map(({name, img, descr, origin}) => (
  <div key={name} style={{textAlign:'center'}}>
    <img style={{borderRadius:'10px'}} src={img}/>
    <h2>{name}</h2>
    <p>{descr}</p>
    <p>{origin}</p>
  </div>
));

export default class Resquared extends Component {
  render () {
    return (
      <div>
        <section style={profiles_cont}>
          {profiles}
        </section>
        <hr style={{marginTop:'10px', marginBottom:'20px'}}/>
        <section style={{display:'flex', justifyContent:'center'}}>
          <article style={{textAlign:'center', maxWidth:'400px'}}>
            <h2>
              We are two Armenian programmers based in Yerevan,
              Armenia, contact us to work on your next software project.
            </h2>
          </article>
        </section>
      </div>
    );
  }
}
