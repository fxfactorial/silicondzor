import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action, computed, toJS, extendObservable } from 'mobx';
import store from './store';
import styled from 'styled-components';
import { StyledLink, ContentWrapper, NewsHeadLine,
         ByLine, BoxShadowWrap, SubmitBanner, SubmissionBox,
         TabBar, TabItem, RowField, Input, SubmissionButton,
         SubmissionContent, PostSubmission}
from './with-style';

export default observer(class extends Component {
  render () {

    return (
      <div>
        This needs to be the user profile
      </div>
    );
  }
});
