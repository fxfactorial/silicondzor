import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';

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

// const BasicExample = () => (
// );

const news_stories = [

  {author:'e_d_g_a_r',
   link:'http://hyegar.com',
   title:'Tech is growing in Armenia',
   vote_count:10,
   comment_count:3},

  {author:'RobertK',
   link: null,
   title:'ASK SD: How long do you work for?',
   vote_count: 3,
   comment_count:12}

];

const s = {
  backgroundColor:'red',
  marginTop:'15px'
};

const NewsItem = ({author, title, comment_count, link}) => (
  <div style={s}>
    <p>{title}</p>
  </div>
);


class SDNews extends Component {
  render() {
    const items =
          news_stories.map(props => <NewsItem key={props.title} {...props}/>);
    return (
      <div>
        {items}
      </div>
    );
  }
};

const SDCalendar = () => (
  <div>
    <h2>Tech Calendar</h2>
  </div>
);

const SDJobs = () => (
  <div>
    <h2> Jobs board </h2>
  </div>
);

const SDBugBounty = () => (
  <div>
    <h2> Bug Bounty </h2>
  </div>
);

const Resquared = () => (
  <div>
    <h2> About Resquared </h2>
  </div>
);

const ul_s = {
  display:'flex',
  justifyContent:'space-between',
  listStyleType: 'none',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const nav_s = {
  marginTop:'20px',
  marginBottom:'20px'
};

const content_s = {
  display:'flex',
  flexDirection:'column',
  marginLeft:'20px',
  marginRight:'20px',
  justifyContent:'space-between'
};

class SDLogin extends Component {
  render () {
    return (
      <div>
        Some kind of Login screen
      </div>
    );
  }
}

export default class Application extends Component {

  state = {language:'Eng'}

  render () {
    return (
      <Switch>
        <div>
          <nav style={nav_s}>
            <ul style={ul_s}>
              <li><Link to={"/"}>news</Link></li>
              <li><Link to={"/tech-calendar"}>tech calendar</Link></li>
              <li><Link to={"/jobs-board"}>jobs board</Link></li>
              <li><Link to={"/bug-bounty"}>bug bounty</Link></li>
              <li><Link to={"/resquared"}>about Resquared</Link></li>
              <li><Link to={"/login"}>login</Link></li>
            </ul>
          </nav>

          <hr/>

          <div style={content_s}>
            <Route exact path={"/"} component={SDNews}/>
            <Route path={"/tech-calendar"} component={SDCalendar}/>
            <Route path={"/jobs-board"} component={SDJobs}/>
            <Route path={"/bug-bounty"} component={SDBugBounty}/>
            <Route path={"/resquared"} component={Resquared}/>
            <Route path={"/login"} component={SDLogin}/>
          </div>
        </div>
      </Switch>
    );
  }
};
