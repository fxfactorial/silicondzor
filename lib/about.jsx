import React, { Component } from 'react';

import styled from 'styled-components';

const test = styled.div`
  width: 100%;
  position: relative;
`;

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

const profiles = names.map(({name, img, descr, origin}) => (
  <div key={name}>
    <img src={img}/>
    <h2>{name}</h2>
    <p>{descr}</p>
    <p>{origin}</p>
  </div>
));

export default class Resquared extends Component {
  render () {
    return (
      <div>
        <section>
          {profiles}
        </section>
        <hr/>
        <section>
          <article>
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
