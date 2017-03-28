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
import routes from './http-routes';
import SDUserProfile from './user-profile';

const ul_s = {
  display:'flex',
  listStyleType: 'none',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const nav_s = {
  backgroundColor:colors.site_colors.banner,
  paddingTop:'20px',
  paddingBottom:'20px'
};

const content_s = {
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between'
};

const application_container = {
  marginTop:'10px',
  marginLeft:'20px',
  marginRight:'20px',
  marginBottom:'10px'
};

const link_style = {
  color:'white',
  textDecoration:'none'
};

const title_style = {
  color:colors.site_colors.title,
  fontSize:'30px',
  marginRight:'10px'
};

const li_style = {
  marginTop:'10px',
  marginRight:'15px'
};

const nav_items = routes.ui_routes.map(({to, title}) => (
  <li style={li_style} key={to}>
    <Link style={link_style} to={to}>
      {title}
    </Link>
  </li>
));

const jobs_ex = [

  {salary:'With experience',
   employer:'A',
   location:'Yerevan',
   contact_info:'foo@bar.com',
   job_descr:'Looking for a rockstar'},

  {salary:'100.000AMD',
   employer:'B',
   location:'Yerevan',
   contact_info:'foo@i.com',
   job_descr:'iOS reverse engineering'},

  {salary:'200,000AMD',
   employer:'C',
   location:'Gyumri',
   contact_info:'eerer@f.com',
   job_descr:'Great React native dev wanted'},

  {salary:`Let's talk`,
   employer:'D',
   location:'Vanadzor',
   contact_info:'oowew@bar.com',
   job_descr:'Some job'}

];

export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>
        <div style={application_container}>
          <nav style={nav_s}>
            <ul style={ul_s}>
              <li style={title_style}>Silicondzor</li>
              <ul style={{...ul_s, marginRight:'auto'}}>{nav_items}</ul>
              <li style={li_style}>
                <Link style={link_style} to={"/login"}>login</Link>
              </li>
            </ul>
          </nav>

          <hr/>

          <div style={content_s}>
            <Route exact path={"/"}        component={SDNews}/>
            <Route path={"/submit"}        component={SDSubmitNews}/>
            <Route path={"/tech-calendar"} component={SDCalendar}/>
            <Route path={"/jobs-board"}    render={() => {
                return (<SDJobs all_jobs={jobs_ex}/>);
            }}/>
            <Route path={"/bug-bounty"}    component={SDBugBounty}/>
            <Route path={"/resquared"}     component={Resquared}/>
            <Route path={"/login"}         component={SDLogin}/>
          </div>
          <BottomFooter/>
        </div>
      </Switch>
    );
  }
};
