import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';
import { Route, Link, NavLink } from 'react-router-dom';
import subDays from 'date-fns/sub_days';
import { observer } from "mobx-react";
import { observable, useStrict } from "mobx";

import Resquared from './about';
import SDBugBounty from './bug-exchange';
import SDNews from './news';
import SDCalendar from './tech-calendar';
import SDJobs from './job-board';
import SDLogin from './login';
import BottomFooter from './footer';
import SDSubmit from './submit';
import colors from './colors';
import routes from './http-routes';
import SDUserProfile from './user-profile';
import SDDiscussion from './discussion';
import { ital } from './utility';

/**
   Enables MobX strict mode globally.
   In strict mode, it is not allowed to
   change any state outside of an action
*/
useStrict(true);

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
  overflow:'scroll',
  display:'flex',
  height:'720px',
  flexDirection:'column',
  justifyContent:'space-between',
  backgroundColor:colors.site_colors.bg
};

const application_container = {
  backgroundColor:colors.site_colors.bg,
  marginLeft:'20px',
  marginRight:'20px'
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
    <NavLink style={link_style}
             exact
             activeStyle={{color:colors.site_colors.active_link}}
             to={to}>
      {title}
    </NavLink>
  </li>
));

const jobs_ex = [

  {salary:'With experience',
   employer:'A',
   upvotes:3,
   downvotes: 2,
   location:'Yerevan',
   job_title:'Some job title',
   contact_info:'foo@bar.com',
   job_descr:'Looking for a rockstar'},

  {salary:'100.000AMD',
   employer:'B',
   upvotes:3,
   job_title:'Another title',
   downvotes: 2,
   location:'Yerevan',
   contact_info:'foo@i.com',
   job_descr:'iOS reverse engineering'},

  {salary:'200,000AMD',
   employer:'C',
   upvotes:3,
   job_title:'test test',
   downvotes: 2,
   location:'Gyumri',
   contact_info:'eerer@f.com',
   job_descr:'Great React native dev wanted'},

  {salary:`Let's talk`,
   employer:'D',
   upvotes:3,
   job_title:'Some job title',
   downvotes: 2,
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

const message_s = {
  fontSize:'1.50em',
  marginTop:'10px',
  textAlign:'center',
  marginBottom:'10px',
  paddingLeft:'15%',
  paddingRight:'15%',
  height:'700px',
  overflow:'scroll'
};

const Guidelines = () => (
  <section style={message_s}>
    <p style={{fontWeight:'bold'}}>Guidelines</p>
    <hr/>
    <section style={{marginTop:'10px', textAlign:'justify'}}>
      <ul style={{listStyleType:'none'}} className={'faqs'}>
        <li>
          <p>
            Silicondzor is a central place for everything tech in Armenia
            and the Caucasus region writ large. As such any discussion
            should be respectful and without personal insults. Moderators
            reserve the right to delete posts without prior notice.
          </p>
        </li>
        <li>
          <p>
            The jobs board should only include
            jobs related to {ital('tech')} and likewise the
            tech calendar should only have {ital('tech')} events.
          </p>
        </li>
        <li>
          <p>
            Spamming is also not allowed, i.e. no posting of
            paid class offerings.
          </p>
        </li>
      </ul>
    </section>
  </section>
);

const Faq = () => (
  <section style={message_s}>
    <p style={{fontWeight:'bold'}}>FAQ</p>
    <hr/>
    <section style={{marginTop:'10px', textAlign:'justify'}}>
      <ul style={{listStyleType:'none'}} className={'faqs'}>
        <li>
          <p>Q: {ital('Who made this?')}</p>
          <p>A: This was made by {' '}
            <a href={'https://hyegar.com'}>Edgar Aroutiounian</a>
            {' '}and Edgar Khanzadian along with contributions
            by other programmers.
          </p>
        </li>
        <li>
          <p>Q: {ital('Why is it called ')}
            <code>silicondzor</code>{ital('?')}</p>
          <p>A: Because the domain was given for free</p>
        </li>
        <li>
          <p>Q: {ital('What languages are acceptable to use?')}</p>
          <p>A: You are free to use any language but the site preference
            is that you use either written
            Armenian in the Armenian alphabet or English
          </p>
        </li>
        <li>
          <p>Q: {ital('The UI/UX sucks, when will you change it?')}</p>
          <p>A: The source code is open and available, you can submit
            a GitHub pull request and if the changes are good then
            it will be accepted.
          </p>
        </li>
        <li>
          <p>Q: {ital('Why does this remind of something?')}</p>
          <p>A: Because it should! It was purposefully modeled after
            YCombinator's HackerNews.
          </p>
        </li>
      </ul>
    </section>
  </section>
);

export default
class Application extends Component {

  render_jobs = () => {
    return (<SDJobs all_jobs={jobs_ex}/>);
  }

  render_bug_bounty = () => {
    return (<SDBugBounty bugs={bugs}/>);
  }

  render () {
    return (
        <div>
          <section>

            <section style={application_container}>
              <section>
                <nav style={nav_s}>
                  <ul style={ul_s}>
                    <li style={title_style}>🇦🇲 Silicondzor</li>
                    <ul style={{...ul_s, marginRight:'auto'}}>{nav_items}</ul>
                    <li style={li_style}>
                      <NavLink style={link_style} to={"/login"}>login</NavLink>
                    </li>
                  </ul>
                </nav>
              </section>

              <section style={content_s}>
                <Switch>
                  <Route exact path={"/"}        component={SDNews}/>
                  <Route path={'/news'}          component={SDNews}/>
                  <Route path={"/submit"}        component={SDSubmit}/>
                  <Route path={"/tech-calendar"} component={SDCalendar}/>
                  <Route path={"/jobs-board"}    render={this.render_jobs}/>
                  <Route path={"/bug-bounty"}    render={this.render_bug_bounty}/>
                  <Route path={"/resquared"}     component={Resquared}/>
                  <Route path={"/login"}         component={SDLogin}/>
                  <Route path={'/item/:id'}      component={SDDiscussion}/>
                  <Route path={'/guidelines'}    component={Guidelines}/>
                  <Route path={'/faq'}           component={Faq}/>
                </Switch>
              </section>

            </section>

            <section>
              <BottomFooter/>
            </section>

          </section>
        </div>
    );
  }
};
