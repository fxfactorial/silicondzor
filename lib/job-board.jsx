import React, { Component } from 'react';
import colors from './colors';
import { observer } from 'mobx-react';

const job_card_s = {
  marginTop:'10px',
  backgroundColor:colors.site_colors.cards
};

const JobCard = (
  {title, content, web_link, creator, creation_time}) => (
    <div style={job_card_s}>
      <p>{title}</p>
      <p>{content}</p>
      <p>{web_link}</p>
      <p>creator_id : {creator}</p>
      <p>{creation_time}</p>
    </div>
  );
@observer
export default class SDJobs extends Component {
  render () {
    const { all_jobs } = this.props;
    const postings =
          all_jobs.map(props => <JobCard key={props.job_descr} {...props}/>);
    return (
      <div>{postings}</div>
    );
  }
}
