import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';
import { Route, Link, NavLink } from 'react-router-dom';
import subDays from 'date-fns/sub_days';
import { observer } from "mobx-react";
import { observable, useStrict } from "mobx";
import styled from 'styled-components';

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
import {
  StyledLink, NavLinks, NavBar, SiteTitle, ContentWrapper,
  Message
}
from './with-style';
import store from './store';

const Header = styled(Message)`
  font-size: 34px;
`;

const LeftMessage = styled(Message)`
  text-align: left;
`;

const Rows = styled(NavLinks)`
  display: inherit;
`;

/**
   Enables MobX strict mode globally.
   In strict mode, it is not allowed to
   change any state outside of an action
*/
useStrict(false);

const nav_items = routes.ui_routes.map(({to, title}) => (
  <li key={to}>
    <StyledLink exact
                activeStyle={{color:'black',
                              textDecoration:'underline'}}
                to={to}>
      {title}
    </StyledLink>
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

const Guidelines = () => (
  <ContentWrapper>
    <Header>Guidelines</Header>
    <hr/>
    <section style={{paddingTop: '20px'}}>
      <Rows className={'faqs'}>
        <li>
          <LeftMessage>
            Silicondzor is a central place for everything tech in Armenia
            and the Caucasus region writ large. As such any discussion
            should be respectful and without personal insults. Moderators
            reserve the right to delete posts without prior notice.
          </LeftMessage>
        </li>
        <li>
          <LeftMessage>
            The jobs board should only include
            jobs related to tech and likewise the
            tech calendar should only have tech events.
          </LeftMessage>
        </li>
        <li>
          <LeftMessage>Spamming is not allowed</LeftMessage>
        </li>
      </Rows>
    </section>
  </ContentWrapper>
);

const Faq = () => (
  <ContentWrapper>
    <Header>FAQ</Header>
    <hr/>
    <section>
      <Rows>
        <li>
          <LeftMessage>Q: Who made this?</LeftMessage>
          <LeftMessage>A: This was made by {' '}
            <a href={'https://hyegar.com'}>Edgar Aroutiounian</a>
            {' '}and Edgar Khanzadian along with contributions
            by other programmers.
          </LeftMessage>
        </li>
        <li>
          <LeftMessage>Q: Why is it called
            <code> silicondzor</code>?
          </LeftMessage>
          <LeftMessage>A: Because the domain was given for free</LeftMessage>
        </li>
        <li>
          <LeftMessage>Q: What languages are acceptable to use?</LeftMessage>
          <LeftMessage>A: You are free to use any language but the site preference
            is that you use either written
            Armenian in the Armenian alphabet or English
          </LeftMessage>
        </li>
        <li>
          <LeftMessage>
            Q: The UI/UX sucks, when will you change it?
          </LeftMessage>
          <LeftMessage>A: The source code is open and available, you can submit
            a GitHub pull request and if the changes are good then
            it will be accepted.
          </LeftMessage>
        </li>
        <li>
          <LeftMessage>Q: Why does this remind of something?</LeftMessage>
          <LeftMessage>A: Because it should! It was purposefully modeled after
            YCombinator's HackerNews.
          </LeftMessage>
        </li>
      </Rows>
    </section>
  </ContentWrapper>
);

const DisplayName =
  observer(() => <p>{store.display_name}{' '}({store.karma_points})</p>);

export default
@observer
class Application extends Component {

  render_jobs = () => {
    return (<SDJobs all_jobs={jobs_ex}/>);
  }

  render_bug_bounty = () => {
    return (<SDBugBounty bugs={bugs}/>);
  }

  render () {
    const elements = [
      <SiteTitle key={'silicondzor'}>Silicondzor</SiteTitle>,
      ...nav_items
    ];
    return (
        <div>
          <section>

            <section>

              <NavBar>
                <NavLinks>{elements}</NavLinks>
                <NavLink style={{paddingRight: '20px',
                         color: 'black', fontWeight: 300}}
                         to={"/login"}>
                  {store.logged_in === true ? <DisplayName/> : 'login' }
                </NavLink>
              </NavBar>

              <section>
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
