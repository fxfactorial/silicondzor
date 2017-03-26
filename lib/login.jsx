import React, { Component } from 'react';

export default
class SDLogin extends Component {
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
          <input />
        </div>
        <div>
          password:
          <input />
        </div>
        <button style={buttonStyle}>
          login
        </button>
        
        <div style={titleStyle}>
          Create account
        </div>
        <div>
          username:
          <input />
        </div>
        <div>
          password:
          <input />
        </div>
        <button style={buttonStyle}>
          create account
        </button>
        
      </div>
    );
  }
}
