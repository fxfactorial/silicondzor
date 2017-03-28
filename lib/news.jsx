import React, { Component } from 'react';
import subDays from 'date-fns/sub_days';
import { Link } from 'react-router-dom';

import colors from './colors';

// Data model should include timestamp
const news_stories = [

  {author:'e_d_g_a_r',
   link:'http://hyegar.com',
   title:'Tech is growing in Armenia',
   vote_count:10,
   post_id:1231,
   time_of_sub:subDays(Date.now(), 1).getTime() - 123123,
   comment_count:3},

  {author:'RobertK',
   link: null,
   post_id:454545,
   title:'ASK SD: How long do you work for?',
   time_of_sub:subDays(Date.now(), 2).getTime() - 10123,
   vote_count: 3,
   comment_count:0}

];


const s = {
  backgroundColor:colors.site_colors.d,
  borderRadius:'5px',
  padding:'5px',
  marginTop:'15px'
};

// Writing an OS in Rust: Handling Exceptions (phil-opp.com)
// 68 points by adamnemecek 1 hour ago | flag | hide | 1 comment

const arrow_style = {
  cursor:'pointer',
  marginLeft:'2px',
  marginRight:'2px'
};

const byline_style = {
  fontSize:'x-large'
};

const span_s = {
  cursor:'pointer'
};

class NewsItem extends Component {

  up_vote = e => {
    console.error('tell server to upvote only if logged in');
  }

  flag_post = e => {
    console.error('tell server to flag the post');
  }

  hide_this_post = e => {
    console.error('Do animation to move this post out');
  }

  render () {
    const {author, title, comment_count,
           time_of_sub, post_id,
           link, vote_count, idx} = this.props;
    const to_author = <Link to={`/user?id=${author}`}>{author}</Link>;
    const flag = <span style={span_s} onClick={this.flag_post}> flag </span>;
    const drilldown = (
      <Link to={`/item?id=${post_id}`}>
        {comment_count === 0 ? 'discuss' : `${comment_count} comments`}
      </Link>);
    // Hiding should have a fun animation
    const hide = <span style={span_s} onClick={this.hide_this_post}>hide</span>;
    const byline = (
      <p>
        {vote_count} points by {to_author} 1 hour ago |
        {flag} | {hide} | {drilldown}
      </p>
    );
    return (
      <div style={s}>
        <div>
          <p style={byline_style}>
            <span>{idx}.</span>
            <i onClick={this.up_vote}
               style={arrow_style}
               className={'material-icons'}>arrow_upward</i>
            {title} {link ? `(${link})` : null}
          </p>
        </div>
        <hr/>
        <div style={{marginLeft:'10px'}}>{byline}</div>
      </div>
    );
  }
};

export default class SDNews extends Component {
  render () {
    const items =
          news_stories
          .map((props, idx) =>
               <NewsItem idx={idx + 1} key={props.title} {...props}/>);
    return (
      <div>
        {items}
      </div>
    );
  }
}
