import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';
import { Route, Link, NavLink } from 'react-router-dom';
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
import subDays from 'date-fns/sub_days';

import store from './sdMobx';
import { observer } from 'mobx-react';

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

const message_s = {
  fontSize:'1.50em',
  marginTop:'10px',
  textAlign:'center',
  marginBottom:'10px',
  paddingLeft:'15%',
  paddingRight:'15%'
};

const ital = s => <span style={{fontStyle:'italic'}}>{s}</span>;

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
            jobs related to {ital('tech')}.
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

export default class Application extends Component {
  async componentWillMount(){
    const links = ['/get-news', '/get-jobs', '/get-bugs', 'get-events'];
    const news = await Promise.all(links.map(async (each) => {
      const fetched = await fetch(each);
      const jsoned = await fetched.json();
      return jsoned;
    }));
    // Need to be join result
    // console.log(news[0]);
    store.news_posts = news[0];
    store.jobs_posts = news[1];
    store.bug_bounties = news[2];
    store.events = news[3];
    this.forceUpdate();
    //we have to make it rerender every time store is changed,
    //better without this.setState();
  }
  updateNews = async () => {
    const fetched = await fetch('/get-news');
    const jsoned = await fetched.json();

    store.news_posts = jsoned;
    this.forceUpdate();
  }
  state = {language:'Eng'}

  render_jobs = () => {
    return (<SDJobs all_jobs={store.jobs_posts}/>);
  }

  render_bug_bounty = () => {
    return (<SDBugBounty bugs={store.bug_bounties}/>);
  }

  render_news = () => {
    return (<SDNews news={store.news_posts} updateNews={this.updateNews}/>);
  }

  render () {
    return (
      <Switch>

        <section>

          <section style={application_container}>
            <nav style={nav_s}>
              <ul style={ul_s}>
                <li style={title_style}>🇦🇲 Silicondzor</li>
                <ul style={{...ul_s, marginRight:'auto'}}>{nav_items}</ul>
                <li style={li_style}>
                  <NavLink style={link_style} to={"/login"}>login</NavLink>
                </li>
              </ul>
            </nav>

            <div style={content_s}>
              <Route exact path={"/"}        render={this.render_news}/>
              <Route path={"/submit"}        component={SDSubmit}/>
              <Route path={"/tech-calendar"} component={SDCalendar}/>
              <Route path={"/jobs-board"}    render={this.render_jobs}/>
              <Route path={"/bug-bounty"}    render={this.render_bug_bounty}/>
              <Route path={"/resquared"}     component={Resquared}/>
              <Route path={"/login"}         component={SDLogin}/>
              <Route path={'/item/:id'}      component={SDDiscussion}/>
              <Route path={'/guidelines'}    component={Guidelines}/>
              <Route path={'/faq'}           component={Faq}/>
            </div>

          </section>
          <BottomFooter/>
        </section>
      </Switch>
    );
  }
};
