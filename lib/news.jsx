import React, { Component } from 'react';
import { observable, action, computed, toJS } from 'mobx';
import subDays from 'date-fns/sub_days';
import { fromPromise } from 'mobx-utils';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import styled from 'styled-components';

import colors from './colors';
import { request_opts, get_query_param_value,
          calculate_time } from './utility';
import routes from './http-routes';
import { StyledLink, ContentWrapper, NewsHeadLine,
         ByLine, Icon, BoxShadowWrap, SubmitBanner
       }
from './with-style';

class NewsItem extends Component {

  up_vote = async (e) => {
    const {id, updateNews} = this.props;
    const send_to_server = request_opts({id});
    const sending = await fetch('/upvote', send_to_server);
    const answer = await sending.json();
    switch (answer.result) {
    case 'success':
      updateNews();
      break;
    default:
      console
        .error('you have to be logged in or there is smth bad on the server');
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
    const to_author =
          <Link to={`/user?id=${creator}`}>{creator}</Link>;
    const flag =
      <span onClick={this.flag_post}> flag </span>;
    const drilldown = (
      <Link
        to={{
          pathname: '/item',
          search: `?id=${id}`,
          state: { ...this.props }
        }}
      >
        {comment_count === 0 ? 'discuss' : `${comment_count} comments`}
      </Link>);
    const to_website =
          !web_link ? null
          : <a style={{paddingLeft: '5px'}} href={web_link}>({web_link})</a>;
    // Hiding should have a fun animation
    const hide =
      <span onClick={this.hide_this_post}>hide</span>;
    /** TODO Make this say how much time ago, use datefns */
    const date = (new Date(creation_time).toLocaleDateString());
    // Need to add a favorites in case we are logged in.
    const byline = (
      <ByLine>
        <span>upvotes: {upvotes}</span> | <span>downvotes: {downvotes}</span> |
        by{to_author} | <a>{calculate_time(creation_time)}</a> |
        {flag} | {hide} | {drilldown}
      </ByLine>
    );
    return (
      <div>
        <NewsHeadLine>
          <p>
            <span>{idx}.</span>
            <Icon onClick={this.up_vote}
                  id={id}
                  className={'material-icons'}>arrow_upward</Icon>
            {title} {to_website}
          </p>
        </NewsHeadLine>
        <hr/>
        {byline}
      </div>
    );
  }
};

export default @observer class SDNews extends Component {

  // Need to use the map so that mobx tracks the NEW pairs added, with
  // plain object it only tracks the ones done initially
  @observable news_items = observable.map({'0':[]});
  @observable _current_page_ = '0';

  @computed get current_page() {
    const items = this.news_items.get(this._current_page_);
    return items === undefined ? [] : items;
  }

  @action componentDidMount() {
    const page = get_query_param_value();
    if (page === null || page === 0) {
      this.news_items.set('0', window.__INIT_NEWS__);
    } else {
      this._current_page_ = '' + page;
      if (this.news_items.get(this._current_page_) === undefined) {
        fetch(`${routes.get_news}?p=${this._current_page_}`)
          .then(d => d.json())
          .then(real_data => {
            this.news_items.set(this._current_page_, real_data);
          });
      }
    }
  }

  render () {
    const link_to = {pathname: '/news', search: `?p=${+this._current_page_ + 1}`};
    const items = this.current_page.map(
      (props, idx) => (
        <NewsItem idx={idx + 1}
                  key={`${props.content}/${props.title}`}
                  {...props}/>)
    );

    return (
      <ContentWrapper>
        <SubmitBanner>Տեխնոլոգիաների մասին քննարկում</SubmitBanner>
        <BoxShadowWrap>
          {items}
          <Link style={{paddingTop: '10px', fontWeight: 300, color: 'black'}}
                to={link_to}>More</Link>
        </BoxShadowWrap>
      </ContentWrapper>
    );
  }
}
