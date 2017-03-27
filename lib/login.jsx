import React, { Component } from 'react';
export default
class SDLogin extends Component {
  constructor(){
    super();
    this.state = {
      logUsername: '',
      logPassword: '',
      createUsername: '',
      createPassword: '',
    }
    this.logUsernameChange = this.logUsernameChange.bind(this);
    this.logPasswordChange = this.logPasswordChange.bind(this);
    this.createUsernameChange = this.createUsernameChange.bind(this);
    this.createPasswordChange = this.createPasswordChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }
  async loginSubmit(){
    const {logUsername, logPassword} = this.state;
    const send_to_server = {
      headers: new Headers({
    	  Accept: 'application/json',
    	  'Content-Type': 'application/json'
    	}),
    	method:'POST',
    	body:JSON.stringify({username: logUsername, password: logPassword})
    }
    console.log('lol');
    const answer = await fetch(`http://localhost:9090/new-account`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }
  logUsernameChange(e){
    const logUsername = e.currentTarget.value;
    this.setState({...this.state, logUsername});
  }
  logPasswordChange(e){
    const logPassword = e.currentTarget.value;
    this.setState({logPassword});
  }
  createUsernameChange(e){
    const createUsername = e.currentTarget.value;
    this.setState({createUsername});
  }
  createPasswordChange(e){
    const createPassword = e.currentTarget.value;
    this.setState({createPassword});
  }
  render () {
    const titleStyle = {
      fontSize: 40,
      marginBottom: 20,
    };
    const buttonStyle = {
      fontSize: 10,
      padding: 4,
      borderRadius: 3,
      marginTop: 10
    };
    return (
      <div>
        <div style={titleStyle}>
          Login
        </div>
        <div>
          username:
          <input onChange={this.logUsernameChange}/>
        </div>
        <div>
          password:
          <input onChange={this.logPasswordChange}/>
        </div>
        <button style={buttonStyle} onClick={this.loginSubmit}>
          login
        </button>
        
        <div style={titleStyle}>
          Create account
        </div>
        <div>
          username:
          <input onChange={this.createUsernameChange}/>
        </div>
        <div>
          password:
          <input onChange={this.createPasswordChange}/>
        </div>
        <button style={buttonStyle}>
          create account
        </button>
        
      </div>
    );
  }
}
