import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action, computed, toJS } from 'mobx';
import styled from 'styled-components';

import { StyledLink, ContentWrapper, NewsHeadLine,
         ByLine, BoxShadowWrap, SubmitBanner, SubmissionBox,
         TabBar, TabItem
       }
from './with-style';
import { request_opts } from './utility';
import routes from './http-routes';

const LOGIN_TAB = 'login', REGISTER_TAB = 'register';
const all_tabs = [LOGIN_TAB, REGISTER_TAB];

const NarrowLogin = styled(BoxShadowWrap)`
  min-width: 400px;
`;

const CenteredWrapper = styled(ContentWrapper)`
  display: flex;
  justify-content: center;
`;

export default @observer class SDLogin extends Component {

  @observable tab_index = 0;

  @computed get tab() { return all_tabs[this.tab_index]; }

  @observable login_creds = {username: '', password: ''}
  // @observable login_creds = {username: '', password: ''}
  @observable create_account = {
    email: 'edgar.factorial@gmail.com',
    username: 'e_d_g_a_r',
    password: 'iterate'
  }
  // @observable create_account = {email: '', username: '', password: ''}

  /** User login handlers */
  @action login_password_handler =
    e => this.login_creds.password = e.target.value;
  @action login_username_handler =
    e => this.login_creds.username = e.target.value;

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

            // <section>

            //   <h1>Login</h1>
            //   <input
            //     placeholder={'Username'}
            //     value={this.login_creds.username}
            //     onChange={this.login_username_handler}
            //     type={'text'}/>
            //   <input
            //     placeholder={'Password'}
            //     value={this.login_creds.password}
            //     onChange={this.login_password_handler}
            //     type={'password'}/>
            //   <input
            //     onClick={this.do_login}
            //     value={'Login'}
            //     type={'button'}
            //     />
            // </section>

            // <h2>OR</h2>

            // <section>
            //   <h1>Create Account</h1>
            //   <input
            //     placeholder={'Username'}
            //     value={this.create_account.username}
            //     onChange={this.create_account_username_handler}
            //     type={'text'}/>
            //   <input
            //     placeholder={'Email address'}
            //     value={this.create_account.email}
            //     onChange={this.create_account_email_handler}
            //     type={'email'}/>
            //   <input
            //     placeholder={'password'}
            //     onChange={this.create_account_password_handler}
            //     value={this.create_account.password}
            //     type={'password'}/>
            //   <input
            //     onClick={this.do_create_account}
            //     value={'Create new account'}
            //     type={'button'}
            //     />
            // </section>
  tab_select = e => this.tab_index = all_tabs.indexOf(e.target.textContent);

  render () {
    let content = null;
    if (this.tab_index === 0) content = <p>login</p>;
    else content = <p>register</p>;
    const tabs =
          all_tabs.map(tab => (
            <TabItem selected={tab === this.tab ? true : false}
                     onClick={this.tab_select}
                     key={tab}>{tab}</TabItem>
          ));
    return (
      <CenteredWrapper>
        <NarrowLogin>
          <TabBar>{tabs}</TabBar>
          <form>{content}</form>
        </NarrowLogin>
      </CenteredWrapper>
    );
  }
}
