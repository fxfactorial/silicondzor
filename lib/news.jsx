import React, { Component } from 'react';

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

export default class SDNews extends Component {
  render () {
    const items =
          news_stories.map(props => <NewsItem key={props.title} {...props}/>);
    return (
      <div>
        {items}
      </div>
    );

  }
}
