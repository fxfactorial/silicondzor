import React, { Component } from 'react';
import subDays from 'date-fns/sub_days';

import colors from './colors';

// Data model should include timestamp
const news_stories = [

  {author:'e_d_g_a_r',
   link:'http://hyegar.com',
   title:'Tech is growing in Armenia',
   vote_count:10,
   date:subDays(Date.now(), 1).getTime() - 123123,
   comment_count:3},

  {author:'RobertK',
   link: null,
   title:'ASK SD: How long do you work for?',
   date:subDays(Date.now(), 2).getTime() - 10123,
   vote_count: 3,
   comment_count:12}

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

class NewsItem extends Component {

  up_vote = e => {
    console.log('upvote');
  }

  render () {
    const {author, title, comment_count, link, vote_count, idx} = this.props;

    return (
      <div style={s}>
        <div>
          <p style={byline_style}>
            <span>{idx}.</span>
            <i onClick={this.up_vote}
               style={arrow_style}
               className={'material-icons'}>arrow_upward</i>
             {title} ({link})
          </p>
        </div>
        <hr/>
        <div>
          <p>
            {vote_count} points by {author} 1 hour ago | flag | hide | {comment_count} comment
          </p>
        </div>
      </div>
    );
  }
};

export default class SDNews extends Component {
  render () {
    const items =
          news_stories.map((props, idx) =>
                           <NewsItem idx={idx + 1} key={props.title} {...props}/>);
    return (
      <div>
        {items}
      </div>
    );
  }
}
