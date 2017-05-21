import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action, computed, toJS, extendObservable } from 'mobx';
import styled from 'styled-components';
import { StyledLink, ContentWrapper, NewsHeadLine,
         ByLine, BoxShadowWrap, SubmitBanner, SubmissionBox,
         TabBar, TabItem, RowField, Input, SubmissionButton,
         SubmissionContent, PostSubmission}
from './with-style';
import { request_opts } from './utility';
import routes from './http-routes';
import store from './store';
import replies from './replies';

const LOGIN_TAB = 'login', REGISTER_TAB = 'register';
const all_tabs = [LOGIN_TAB, REGISTER_TAB];

const CenteredWrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  background-color: #f6f6ef;
  min-height: 0px;
  justify-content: center;
`;

const FieldName = styled.label`
  padding-right: 5px;
`;

const login_handler = async () => {
  const result = await fetch(routes.post.sign_in,
                             request_opts(toJS(store.credentials)));
  const answer = await result.json();
  switch (answer.result) {
  case replies.success:
    error_condition_store.error = false;
    store.logged_in = true;
    store.display_name = store.credentials.username;
    store.credentials.username = '';
    store.credentials.password = '';
    break;
  case replies.failure:
    error_condition_store.error = true;
    error_condition_store.reason = answer.reason;
    break;
  default:
    console.error('Unknown reply from server', answer);
  }

};

const Login = observer(() => {
  return (
    <PostSubmission>
      <SubmitBanner>Login</SubmitBanner>
      <CenteredWrapper>

        <RowField>
          <FieldName>Username:</FieldName>
          <Input
            value={store.credentials.username}
            onChange={e => store.credentials.username = e.target.value}/>
        </RowField>

        <div style={{paddingTop:'5px', paddingBottom: '5px'}}/>

        <RowField>
          <FieldName>Password:</FieldName>
          <Input type={'password'}
                 value={store.credentials.password}
                 onChange={e => store.credentials.password = e.target.value}/>
        </RowField>

        <SubmissionButton onClick={login_handler}>
          Login
        </SubmissionButton>

      </CenteredWrapper>

    </PostSubmission>
  );
});

const new_user_registration = new (class {
  constructor() {
    extendObservable(this, {
      email: '', username: '', password: '', color: 'black', success: false
    });
  }
});

const error_condition_store = new (class {
  constructor() { extendObservable(this, {reason: '', error: false}); }
});


const email_regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const register_account = async () => {
  const resp = await fetch(routes.post.new_account,
                           request_opts(toJS(new_user_registration)));
  const answer = await resp.json();
  console.log(answer);
  switch (answer.result) {
  case replies.success:
    store.logged_in = true;
    new_user_registration.email = '';
    new_user_registration.username = '';
    new_user_registration.password = '';
    new_user_registration.success = true;
    break;
  case replies.failure:
    error_condition_store.error = true;
    error_condition_store.reason = answer.reason;
    break;
  default:console.error(`Unknown reply from server`, answer);
  }

};

const not_valid = () => {
  if (email_regex.test(new_user_registration.email) === false) {
    new_user_registration.color = '#ff3f3f';
    error_condition_store.error = true;
    error_condition_store.reason = 'Invalid email address';
  } else {
    new_user_registration.color = 'black';
    error_condition_store.error = false;
    error_condition_store.reason = '';
  }
};

const Register = observer(() => {
  return (
    <PostSubmission>
      <SubmitBanner>Register a new account</SubmitBanner>
      <CenteredWrapper>
        <RowField>
          <FieldName>Email account:</FieldName>
          <Input placeholder={'hayek@armenia.com'}
                 style={{color: new_user_registration.color}}
                 onBlur={not_valid}
                 type={'email'}
                 required={true}
                 value={new_user_registration.email}
                 onChange={e => new_user_registration.email = e.target.value}/>
        </RowField>

        <div style={{paddingTop:'5px', paddingBottom: '5px'}}/>

        <RowField>
          <FieldName>Username:</FieldName>
          <Input
            value={new_user_registration.username}
            onChange={e => new_user_registration.username = e.target.value}/>
        </RowField>

        <div style={{paddingTop:'5px', paddingBottom: '5px'}}/>

        <RowField>
          <FieldName>Password:</FieldName>
          <Input type={'password'}
                 value={new_user_registration.password}
                 onChange={e => new_user_registration.password = e.target.value}/>
        </RowField>

        <SubmissionButton onClick={register_account}>
          Create Account
        </SubmissionButton>

      </CenteredWrapper>

    </PostSubmission>

  );
});

const ErrorBox = styled.section`
  text-align: center;
  background-color: #ff3f3f;
  color: black;
  margin-top: 30px;
  padding-bottom: 30px;
`;

const SuccessBox = styled(ErrorBox)`
  background-color: #94e064;
`;

const Error = observer(() => (
  <ErrorBox>
    <SubmitBanner>Error</SubmitBanner>
    <p>{error_condition_store.reason}</p>
  </ErrorBox>
));

const CheckEmailPrompt = observer(() => (
  <SuccessBox>
    <SubmitBanner>Registered!</SubmitBanner>
    <p>Check your email for the verification link</p>
  </SuccessBox>
));

export default @observer class SDLogin extends Component {

  @observable tab_index = 0;

  @computed get tab() { return all_tabs[this.tab_index]; }

  /** User login handlers */
  @action login_password_handler =
    e => store.credentials.password = e.target.value;
  @action login_username_handler =
    e => store.credentials.username = e.target.value;

  /** Create account handlers */
  @action create_account_username_handler =
    e => this.create_account.username = e.target.value;
  @action create_account_email_handler =
    e => this.create_account.email = e.target.value;
  @action create_account_password_handler =
    e => this.create_account.password = e.target.value;

  @action do_login = async () => {
    const login_result =
          await fetch(routes.post.sign_in,
                      request_opts(toJS(this.login_creds)));
    console.log(login_result);
  };

  @action do_create_account = async () => {
    const create_account =
          await fetch(routes.post.new_account,
                      request_opts(toJS(this.create_account)));
    console.log('Create an account', create_account);
  };

  tab_select = e => this.tab_index = all_tabs.indexOf(e.target.textContent);

  render () {
    let content = null;
    if (this.tab_index === 0) content = <Login/>;
    else                      content = <Register/>;
    const tabs =
          all_tabs.map(tab => (
            <TabItem selected={tab === this.tab ? true : false}
                     onClick={this.tab_select}
                     key={tab}>{tab}</TabItem>
          ));
    return (
      <SubmissionContent>
        <SubmissionBox>
          <TabBar>{tabs}</TabBar>
          {content}
          {error_condition_store.error && <Error/>}
          {new_user_registration.success && <CheckEmailPrompt/>}
        </SubmissionBox>
      </SubmissionContent>
    );
  }
}
