import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment_timezone from 'moment-timezone';
import { Switch } from 'react-router';

import { Route, Link } from 'react-router-dom';

// moment_timezone.tz.setDefault('Asia/Yerevan');
// BigCalendar.momentLocalizer(moment_timezone);
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

const BasicExample = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>

    <hr/>

    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/topics" component={Topics}/>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
    </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>{BasicExample()}</Switch>
    );
  }
};
