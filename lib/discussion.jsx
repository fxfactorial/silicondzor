import React, { Component } from 'react';

const Comment = ({parent, content, user}) => (
  <div>
    This is some comment
  </div>
);

export default class SDDiscussion extends Component {
  render() {
    //get post_id from url
    const post_id = this.props.match.params.id
    //
    //get array of url variables like [{smthreallycool: "123"}, {hey: "123"}] 
    //from "?smthreallycool=123&hey=123"
    const {search} = this.props.location;
    const arrayOfURLVars = search.substring(1, search.length).split('&').map((value) => {
      const pair = value.split('=');
      let obj = {};
      obj[pair[0]] = pair[1];
      return obj;
    });
    console.log(arrayOfURLVars);
    //
    return (
      <div>
        <div>This is the discussion</div>
      </div>
    );
  }
};
