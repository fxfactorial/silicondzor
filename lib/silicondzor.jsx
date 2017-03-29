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
import SDDiscussion from './discussion';
import subDays from 'date-fns/sub_days';

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

const bugs = [

  {post_time:subDays(Date.now(), 1).getTime() - 123123,
   creator:'Sipan',
   descr:'Come find bugs in Government Infrastructure'},

  {post_time:subDays(Date.now(), 2).getTime() - 123123,
   creator:'Gor',
   descr:'Fuzz test our ecommerce site'},

  {post_time:subDays(Date.now(), 3).getTime() - 123123,
   creator:'Hasmik',
   descr:'Pentest our security system'}
];

export default class Application extends Component {

  state = {language:'Eng'}

  render_jobs = () => {
    return (<SDJobs all_jobs={jobs_ex}/>);
  }

  render_bug_bounty = () => {
    return (<SDBugBounty bugs={bugs}/>);
  }

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
            <Route path={"/jobs-board"}    render={this.render_jobs}/>
            <Route path={"/bug-bounty"}    render={this.render_bug_bounty}/>
            <Route path={"/resquared"}     component={Resquared}/>
            <Route path={"/login"}         component={SDLogin}/>
            <Route path={'/item?id=:post_id'} component={SDDiscussion}/>
          </div>
          <BottomFooter/>
        </div>
      </Switch>
    );
  }
};
