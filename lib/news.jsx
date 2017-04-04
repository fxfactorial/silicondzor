import React, { Component } from 'react';
import { observable } from "mobx";
import subDays from 'date-fns/sub_days';
import { Link } from 'react-router-dom';
import colors from './colors';
import { observer } from "mobx-react";

import { request_opts } from './utility';

const news_style = {
  backgroundColor:colors.site_colors.cards,
  borderRadius:'5px',
  margin:'10px',
  padding:'5px'
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

export default
@observer
class SDNews extends Component {

  @observable page_count = 1;

  handle_page_click = () => {
    console.log(this.page_count);
    // Now need to call parent code and restart things?
    this.page_count++;
  }

  componentDidMount() {
    window.onpopstate = ev => {
      if (document.location.pathname === '/news') {
        const params = new URLSearchParams(document.location.search);
        this.page_count = +params.get('p');
      }
    };
  }


  render () {
    const items = this.props.news.map(
      (props, idx) =>(
        <NewsItem idx={idx + 1}
                  key={`${props.content}/${props.title}`}
                  {...props}/>)
    );
    const link_to = {
      pathname: '/news',
      search: `?p=${this.page_count}`
    };
    console.log(this.page_count);
    return (
      <section>
        {items}
        <Link onClick={this.handle_page_click}
              style={{marginLeft:'10px'}}
              to={link_to}>
          More
        </Link>
      </section>
    );
  }
}
