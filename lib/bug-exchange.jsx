import React, { Component } from 'react';

const BugCard = (
  {post_time, creator, descr}) => (
    <div>
      <p>{descr}</p>
      <p>Posted at {post_time} by {creator}</p>
    </div>
  );

export default
class SDBugBounty extends Component {
  render () {
    const { bugs } = this.props;
    const all_bugs = bugs.map(p => <BugCard key={p.descr} {...p}/>);
    return (
      <div>
        Bug Exchange
        {all_bugs}
      </div>
    );
  }
}
