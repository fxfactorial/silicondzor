import React, { Component } from 'react';
import Layout from './containers/layout';
import Events from './views/events-calendar';
import About from './views/about';
import Login from './views/login';
import News from './views/news';
import { Router, Route, Link, IndexRoute } from 'react-router';
import routes from './http-routes';

const ui = routes.ui_routes;

export default (
  <Route path={ui.home.resource} component={Layout}>
    <IndexRoute component={News} />
    <Route path={ui.about.link} component={About}/>
    <Route path={ui.tech_calendar.link} component={Events}/>
    <Route path={ui.login.link} component={Login}/>
  </Route>
);
