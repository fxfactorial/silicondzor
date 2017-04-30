import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import colors from './colors';
import { ContentWrapper, Icon, Message, NewsHeadLine, SubmitBanner, BoxShadowWrap }
from './with-style';



const BugCard = (
  {creator, creation_time, title, content, web_link}) => (
    <div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{web_link}</p>
      <p>creator : {creator}</p>
      <p>{creation_time}</p>
    </div>
  );

export default @observer class SDBugBounty extends Component {
  render () {
    const { bugs } = this.props;
    const all_bugs = bugs.map(p => <BugCard key={p.descr} {...p}/>);
    return (
      <ContentWrapper>
        <SubmitBanner>Bug Exchange</SubmitBanner>
        <BoxShadowWrap>
          {all_bugs}
        </BoxShadowWrap>
      </ContentWrapper>
    );
  }
}
