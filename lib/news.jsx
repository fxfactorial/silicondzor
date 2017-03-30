import React, { Component } from 'react';
import subDays from 'date-fns/sub_days';
import { Link } from 'react-router-dom';
import colors from './colors';
import ReactPaginate from 'react-paginate';

import {request_opts} from './utility';

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

const news_style = {
  backgroundColor:colors.site_colors.cards,
  borderRadius:'5px',
  margin:'10px',
  padding:'5px'
};

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

  up_vote = async (e) => {
    const {id, updateNews} = this.props;
    const send_to_server = request_opts(JSON.stringify({id}));
    const sending = await fetch('/upvote', send_to_server);
    const answer = await sending.json();
    switch (answer.result) {
      case 'success':
        updateNews();
        break;
      default:
        console.error('you have to be logged in or there is smth bad on the server');
        break;
    }
  }

  flag_post = e => {
    console.error('tell server to flag the post');
  }

  hide_this_post = e => {
    console.error('Do animation to move this post out');
  }

  render () {
    const {creator, title, comment_count,
           creation_time,
           web_link, upvotes, downvotes,
           content, idx, id} = this.props;
    const to_author = <Link to={`/user?id=${creator}`}>{creator}</Link>;
    const flag =
          <span style={span_s} onClick={this.flag_post}> flag </span>;
    const drilldown = (
      <Link to={`/item/${id}?smthreallycool=123&hey=123`}>
        {comment_count === 0 ? 'discuss' : `${comment_count} comments`}
      </Link>);
    const to_website =
          !web_link ? null
          : (
            <a style={{color:'black'}}
               href={web_link}>({web_link})</a>
          );
    // Hiding should have a fun animation
    const hide =
          <span style={span_s} onClick={this.hide_this_post}>hide</span>;
    // Need to add a favorites in case we are logged in.
    const byline = (
      <p>
        upvotes:{upvotes} | downvotes:{downvotes} |
        points by {to_author} | time: {creation_time} |
        {flag} | {hide} | {drilldown}
      </p>
    );
    return (
      <div style={news_style}>
        <div>
          <p style={byline_style}>
            <span>{idx}.</span>
            <i onClick={this.up_vote}
               id={id}
               style={arrow_style}
               className={'material-icons'}>arrow_upward</i>
            {title} {to_website}
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
          this.props.news
          .map((props, idx) =>
               <NewsItem idx={idx + 1}
               updateNews={this.props.updateNews}
               key={props.id}
               {...props}/>);
    return (
      <div>
        {items}
      </div>
    );
  }
}
