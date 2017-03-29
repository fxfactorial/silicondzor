import React, { Component } from 'react';

const Comment = ({parent, content, user}) => (
  <div>
    This is some comment
  </div>
);

export default class SDDiscussion extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        This is the discussion
      </div>
    );
  }
};
