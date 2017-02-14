import React, { Component } from 'react';
import TopBanner from '../views/top-bar';
import Footer from '../views/footer';
import routes from '../http-routes';

const ui = routes.ui_routes;

export default class _ extends Component {
  render () {
    let child_props = null;
    switch (this.props.location.pathname) {
    case ui.about.resource:
      child_props = {};
      break;
    case ui.tech_calendar.resource:
      child_props = {title_language:'Eng'};
      break;
    case ui.login.resource:
      child_props = {};
      break;
    case ui.home.resource:
      child_props = {};
      break;
    case ui.bug_exchange.resource:
      child_props = {};
      break;
    default:
      throw new Error(`Unknown UI route-request: ${this.props.location.pathname}`);
    };
    return (
      <div>
	<TopBanner/>
	{this.props.children && React.cloneElement(this.props.children, child_props)}
	<Footer/>
      </div>
    );
  }
}
