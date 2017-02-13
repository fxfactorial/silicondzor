// import {Application, TechCalendar} from '../lib/silicondzor';
import News from '../lib/dzor-news';
import JobsBoard from '../lib/jobs-board';
import routes from '../lib/Routes';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
// Solely because of Safari's fetch sucking
import 'whatwg-fetch';

render((
  <Router routes={routes} history={browserHistory}/>
), document.getElementById('container'));
