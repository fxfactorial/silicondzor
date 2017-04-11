import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action, computed, toJS } from 'mobx';
import { request_opts } from './utility';

const input_style = {
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
};

const form_style = {
  display:'flex',
  flexDirection:'column',
  minWidth:'200px',
  textAlign:'center'
};

export default
@observer
class SDLogin extends Component {

  @observable login_creds = {username:'', password:''}
  @observable create_account = {username:'', password:''}

  @action login_password_handler =
    e => this.login_creds.password = e.target.value;

  @action login_username_handler =
    e => this.login_creds.username = e.target.value;

  @action create_account_password_handler =
    e => this.login_creds.password = e.target.value;

  @action create_account_username_handler =
    e => this.login_creds.username = e.target.value;

  @action do_login = async () => {
    console.log('fetched', toJS(this.login_creds));
  };

  @action do_create_account = async () => {
    console.log('Create an account');
  };


  render () {
    return (
      <form style={input_style}>

        <section style={form_style}>

          <p>Login</p>
            <input
              placeholder={'Username'}
              value={this.login_creds.username}
              onChange={this.login_username_handler}
              type={'text'}/>
            <input
              placeholder={'Password'}
              value={this.login_creds.password}
              onChange={this.login_password_handler}
              type={'password'}/>
            <input
              onClick={this.do_login}
              value={'Login'}
              type={'button'}
              />
            <hr/>
        </section>

        <section style={form_style}>
          <p>Create Account</p>

          <input
            placeholder={'New username'}
            value={this.create_account.username}
            onChange={this.create_account_username_handler}
            type={'text'}/>
          <input
            placeholder={'password'}
            onChange={this.create_account_password_handler}
            value={this.create_account.password}
            type={'password'}/>
          <input
            onClick={this.do_create_account}
            value={'Create new account'}
            type={'button'}
            />
        </section>

      </form>
    );
  }
}
