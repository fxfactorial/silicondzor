import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';

BigCalendar.momentLocalizer(moment);

const { Component } = React;

class Login extends Component {

  constructor(p) {
    super(p);
    this.state = {
      username: '',
      password:'',
      email_valid: false
    };
  }

  form_action = (register_account, e) => {
    e.preventDefault();
    const query =
          register_account ? '/new-account' : '/sign-in';

    this.setState({username:'', password:'', email_valid: false});
    this.props.close_modal();
  };

  username_changed = e => {
    const s = this.state;
    s.username = e.target.value;
    // Returns true if the element's value
    // has no validity problems; false otherwise.
    s.email_valid = e.target.validity.valid;
    this.setState(s);
  }

  render () {
    return (
      <form>
        <p>
          Login so that you can add tech events, do not use
          anything serious for your password.
        </p>
        <hr/>
        <div>
          <label>Username</label>
          <input type={'email'}
                 value={this.state.username}
                 placeholder={'someusername'}
                 onChange={this.username_changed}
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
                 onClick={this.form_action.bind(this, true)}
                 value={'Register an account'}/>
          <input type={'submit'}
                 onClick={this.form_action.bind(this, false)}
                 value={'Sign in'}/>
        </div>
      </form>
    );
  }
};

class Banner extends Component {

  state = {open:true}

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

  // request_close = e => this.setState({open:!this.state.open});

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
              All the tech events in Armenia  🇦🇲
            </p>
            <p>
              <span onClick={this.login_handler}
                    style={login_s}> Login</span> so that you can add your own
            </p>
            <Modal
              style={modal_s}
              isOpen={this.state.open}>
              <Login close_modal={() => this.setState({open:false})}/>
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
      zIndex:this.props.z_value
    };

    return (
      <div style={this.props.tech_calendar_s}>
        <BigCalendar
          selectable
          style={s}
          popup
          timeslots={1}
          onSelectSlot={this.selectedDate}
          events={[]}
          />
      </div>
    );
  }
};

export default
class _ extends Component {
  state = {calendar_z_value: '0'}

  render () {
    return (
      <div>
        <Banner push_calendar={should_push => {
            if (should_push) {
              this.setState({calendar_z_value:'-100'});
            } else {
              this.setState({calendar_z_value:'0'});
            }
          }}/>
          <TechCalendar z_value={this.state.calendar_z_value}/>
      </div>
    );
  }
};
