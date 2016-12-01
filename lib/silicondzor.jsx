import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';

BigCalendar.momentLocalizer(moment);

const { Component } = React;

// Basically when the modal launches then need to have the z-index change
// of the calendar component

class Login extends Component {

  constructor(p) {
    super(p);
    this.state = {username: '', password:''};
  }

  try_login = e => {
    e.preventDefault();
    this.setState({username:'', password:''});
  };

  render () {
    return (
      <form>
        <p>Login so that you can write blog posts or add tech events.</p>
        <hr/>
        <div>
          <label>Username</label>
          <input type={'text'}
                 value={this.state.username}
                 placeholder={'someusername'}
                 onChange={e =>
            this.setState({...this.state, username:e.target.value})}
            />
        </div>
        <div>
          <label>Password</label>
          <input type={'password'}
                 placeholder={'not a serious password'}
                 value={this.state.password}
                 onChange={e =>
            this.setState({...this.state, password:e.target.value})}
            />
        </div>
        <div>
          <input type={'button'}
                 onClick={this.try_login}
                 value={'Register an account'}/>
          <input type={'submit'} value={'Sign in'}/>
        </div>
      </form>
    );
  }
};

class Banner extends Component {

  state = {open:false}

  static defaultProps = {
    header_s: {
      minHeight: '20vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff5e12'
    }
  }

  login_handler = e => {
    this.setState({open:!this.state.open});
  }

  request_close = e => this.setState({open:!this.state.open});

  render () {
    const login_s = {
      cursor:'pointer',
      textDecoration:'underline'
    };
    const modal_s = {
      overlay: {
        position:'fixed',
        top:'20vh',
        left:'20vw',
        right:'20vw',
        bottom:'20vh'
      },
      content:{ }
    };
    return (
      <div>
        <header style={this.props.header_s}>
          <h1 style={{paddingRight:'2rem'}}>
            Silicondzor
          </h1>
          <div>
            <p>
              All the tech events in Armenia
            </p>
            <p>
              <span onClick={this.login_handler}
                    style={login_s}> Login</span> so that you can add your own
            </p>
            <Modal
              style={modal_s}
              onRequestClose={this.request_close}
              isOpen={this.state.open}>
              <Login/>
            </Modal>
          </div>
        </header>
      </div>
    );
  }
};

class TechCalendar extends Component {

  static defaultProps = {
    tech_calendar_s: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  selectedDate = e => {
    console.log(e);
  }

  render () {
    const s = {
      backgroundColor:'white',
      minHeight:'80vh',
      minWidth:'100%',
      zIndex:'-100'
    };

    return (
      <div style={this.props.tech_calendar_s}>
        <BigCalendar
          selectable
          style={s}
          popup
          onSelectSlot={this.selectedDate}
          events={[]}
          />
      </div>
    );
  }
};

export default
class _ extends Component {
  render () {
    return (
      <div>
        <Banner/>
        <TechCalendar/>
      </div>
    );
  }
};
