import React, { Component } from 'react';
import colors from './colors';
import { ital } from './utility';

const JobCard = (
  {contact_info, employer, downvote_handler, idx,
   upvotes, downvotes, upvote_handler, job_title,
   job_descr, location, salary}) => (
    <section key={job_descr}>
      <p>
        {upvotes}
        <i onClick={upvote_handler}
           className={'material-icons'}>arrow_upward</i>
        <span>{downvotes}</span>
        <i onClick={downvote_handler}
           className={'material-icons'}>arrow_downward</i>
        {ital('Posted by: ')} {employer}, {ital('location: ')} {location}
      </p>
      <hr/>
      <details open={false}>
        <summary>
          <span>{job_title}</span>
        </summary>
        {job_descr}
      </details>
    </section>
  );


export default class SDJobs extends Component {

  downvote = () => {
    console.log('something downvote');
  }

  upvote = () => {
    console.log('something upvote');
  }

  render () {
    const { all_jobs } = this.props;
    console.log(this.props);
    const postings =
          all_jobs.map((props, idx) => (
            <JobCard upvote_handler={this.upvote}
                     downvote_handler={this.downvote}
                     {...props}
                     idx={idx + 1}
                     key={props.job_descr}
                     />
          ));
    return <div>{postings}</div>;
  }

};
