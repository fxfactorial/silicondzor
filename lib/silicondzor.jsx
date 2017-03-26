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

const ul_s = {
  display:'flex',
  justifyContent:'space-between',
  listStyleType: 'none',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const nav_s = {
  marginTop:'20px',
  marginBottom:'20px'
};

const content_s = {
  display:'flex',
  flexDirection:'column',
  marginLeft:'20px',
  marginRight:'20px',
  justifyContent:'space-between'
};


export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>
        <div>
          <nav style={nav_s}>
            <ul style={ul_s}>
              <li><Link to={"/"}>news</Link></li>
              <li><Link to={"/tech-calendar"}>tech calendar</Link></li>
              <li><Link to={"/jobs-board"}>jobs board</Link></li>
              <li><Link to={"/bug-bounty"}>bug bounty</Link></li>
              <li><Link to={"/resquared"}>about Resquared</Link></li>
              <li><Link to={"/login"}>login</Link></li>
            </ul>
          </nav>

          <hr/>

          <div style={content_s}>
            <Route exact path={"/"} component={SDNews}/>
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
