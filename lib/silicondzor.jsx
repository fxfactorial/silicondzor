import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';

import { Route, Link } from 'react-router-dom';

// const default_scroll_time = new Date(1970, 1, 1, 4);
// const request_opts = body => {
//   return {
//     method:'post',
//     headers: new Headers({
//       'content-type':'application/json'
//     }),
//     body
//   };
// };

// const BasicExample = () => (
// );

class SDNews extends Component {
  render() {
    return (
      <div>
        <h2>News</h2>
      </div>
    );
  }
};

const SDCalendar = () => (
  <div>
    <h2>About</h2>
  </div>
);

const SDJobs = () => (
  <div>
    <h2> Jobs board </h2>
  </div>
);

const SDBugBounty = () => (
  <div>
    <h2> Bug Bounty </h2>
  </div>
);

const Resquared = () => (
  <div>
    <h2> About Resquared </h2>
  </div>
);

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

export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>
        <div>
          <nav style={nav_s}>
            <ul style={ul_s}>
              <li><Link to={"/"}>News</Link></li>
              <li><Link to={"/tech-calendar"}>Tech Calendar</Link></li>
              <li><Link to={"/jobs-board"}>Jobs Board</Link></li>
              <li><Link to={"/bug-bounty"}>Bug Bounty</Link></li>
              <li><Link to={"/resquared"}>About Resquared</Link></li>
            </ul>
          </nav>

          <hr/>

          <Route exact path={"/"} component={SDNews}/>
          <Route path={"/tech-calendar"} component={SDCalendar}/>
          <Route path={"/jobs-board"} component={SDJobs}/>
          <Route path={"/bug-bounty"} component={SDBugBounty}/>
          <Route path={"/resquared"} component={Resquared}/>
        </div>
      </Switch>
    );
  }
};
