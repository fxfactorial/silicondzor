import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import Resquared from './about';
import SDBugBounty from './bug-exchange';
import SDNews from './news';
import SDCalendar from './tech-calendar';
import SDJobs from './job-board';
import SDLogin from './login';
import BottomFooter from './footer';
import SDSubmitNews from './submit-news';
import colors from './colors';

const ul_s = {
  display:'flex',
  listStyleType: 'none',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const nav_s = {
  backgroundColor:colors.site_colors.a,
  paddingTop:'20px',
  paddingBottom:'20px'
};

const content_s = {
  display:'flex',
  flexDirection:'column',
  marginLeft:'20px',
  marginRight:'20px',
  justifyContent:'space-between'
};

const link_style = {
  color:'white',
  marginRight:'15px',
  textDecoration:'none'
};

const title_style = {
  color:colors.site_colors.d,
  fontSize:'xx-large',
  marginRight:'10px'
};

export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>
        <div>
          <nav style={nav_s}>
            <ul style={ul_s}>
              <li style={title_style}>Silicondzor</li>

              <ul style={{...ul_s, marginRight:'auto'}}>
                <li><Link style={link_style} to={"/"}>news</Link></li>
                <li><Link style={link_style} to={"/submit"}>submit</Link></li>
                <li><Link style={link_style} to={"/tech-calendar"}>tech calendar</Link></li>
                <li><Link style={link_style} to={"/jobs-board"}>jobs board</Link></li>
                <li><Link style={link_style} to={"/bug-bounty"}>bug bounty</Link></li>
                <li><Link style={link_style} to={"/resquared"}>about Resquared</Link></li>
              </ul>

              <li><Link style={link_style} to={"/login"}>login</Link></li>
            </ul>
          </nav>

          <hr/>

          <div style={content_s}>
            <Route exact path={"/"} component={SDNews}/>
            <Route path={"/submit"} component={SDSubmitNews}/>
            <Route path={"/tech-calendar"} component={SDCalendar}/>
            <Route path={"/jobs-board"} component={SDJobs}/>
            <Route path={"/bug-bounty"} component={SDBugBounty}/>
            <Route path={"/resquared"} component={Resquared}/>
            <Route path={"/login"} component={SDLogin}/>
          </div>
          <BottomFooter/>
        </div>
      </Switch>
    );
  }
};
