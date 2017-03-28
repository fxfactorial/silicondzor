import React, { Component } from 'react';
import colors from './colors';

const job_card_s = {
  marginTop:'10px',
  backgroundColor:colors.site_colors.cards
};

const JobCard = (
  {salary, location, employer, job_descr}) => (
    <div style={job_card_s}>
      <p>{job_descr} in {location}</p>
      <p>expected salary: {salary} {employer}</p>
    </div>
  );

export default class SDJobs extends Component {
  render () {
    const { all_jobs } = this.props;
    const postings = all_jobs.map(props => <JobCard {...props}/>);
    return (
      <div>{postings}</div>
    );
  }
}
