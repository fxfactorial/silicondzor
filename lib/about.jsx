import React, { Component } from 'react';
import styled from 'styled-components';

import colors from './colors';
import { ContentWrapper, Icon, Message, NewsHeadLine, SubmitBanner }
from './with-style';

// Should come from a query
const names = [

  {name: 'Edgar Aroutiounian',
   descr:'Founder - programmer from San Francisco',
   origin:'Raised in America',
   img:'/edgar-arout.jpg'},

  {name: 'Edgar Khanzadian',
   descr:'Founder - Straight outta Stalingrad',
   origin:'Raised in Russia',
   img:'/edgar-khan.jpg'},

  // {name: 'Robert Gevorgyan', img:'/robert.png'}
];

const ImageWrapper = styled.img`
  box-shadow: 3px 3px 0px 0px ${colors.site_colors.banner};
`;

const profiles = names.map(({name, img, descr, origin}) => (
  <div key={name}>
    <ImageWrapper src={img}/>
    <SubmitBanner>{name}</SubmitBanner>
    <p style={{fontWeight: 300}}>{descr}</p>
    <p style={{fontWeight: 300}}>{origin}</p>
  </div>
));

const ProfilesWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default () => (
  <ContentWrapper>
    <SubmitBanner>
      We are two Armenian programmers based in Yerevan,
      Armenia; contact us to work on your next software project.
    </SubmitBanner>
    <ProfilesWrapper>{profiles}</ProfilesWrapper>
  </ContentWrapper>
);
