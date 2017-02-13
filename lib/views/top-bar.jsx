import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';

const ui = routes.ui_routes;
// console.log(ui_routes);

export default class _ extends Component {
  render () {
    const links = [
      ui.home,
      ui.about, 
      ui.tech_calendar,
      ui.login
    ].map(item => {
      return (
	<li key={item.resource}>
	  <Link to={item.resource}>{item.link}</Link>
	</li>
      );
    });

    return (
      <div>
	<ul>
	  {links}
	</ul>
      </div>
    );
  }
};
