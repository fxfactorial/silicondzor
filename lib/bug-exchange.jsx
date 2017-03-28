import React, { Component } from 'react';

const BugCard = (
  {post_time, creator}) => (
    <div>
      <p>Posted at {post_time} by {creator}</p>
    </div>
  );

export default
class SDBugBounty extends Component {
  render () {
    return (
      <div>
	      Bug Exchange
      </div>
    );
  }
}
