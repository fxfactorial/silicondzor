import React, { Component } from 'react';
// Later pick what we actually need to avoid code bloat.
import DateFns from 'date-fns';


// Data model should include timestamp
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

// Writing an OS in Rust: Handling Exceptions (phil-opp.com)
// 68 points by adamnemecek 1 hour ago | flag | hide | 1 comment

const NewsItem = ({author, title, comment_count, link, vote_count, idx}) => (
  <div style={s}>
    <div>
      <p>{idx} {title} ({link})</p>
    </div>
    <div>
      <p>
        {vote_count} points by {author} 1 hour ago | flag | hide | {comment_count} comment
      </p>
    </div>
  </div>
);

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
