import React, { Component } from 'react';
import colors from './colors';
import { observer } from 'mobx-react';

const bug_card_s = {
  backgroundColor:colors.site_colors.cards
};

const BugCard = (
  {creator, creation_time, title, content, web_link}) => (
    <div style={bug_card_s}>
      <p>{title}</p>
      <p>{content}</p>
      <p>{web_link}</p>
      <p>creator : {creator}</p>
      <p>{creation_time}</p>
    </div>
  );

@observer
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
