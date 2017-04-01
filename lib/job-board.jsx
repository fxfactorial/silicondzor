import React, { Component } from 'react';
import colors from './colors';
import { ital } from './utility';

const job_card_s = {
  marginTop:'10px',
  padding:'10px',
  backgroundColor:colors.site_colors.cards
};

const JobCard = (
  {contact_info, employer, downvote_handler,
   upvotes, downvotes, upvote_handler, job_title,
   job_descr, location, salary}) => (
    <section style={job_card_s} key={job_descr}>
      <p>
        {upvotes}
        <i onClick={upvote_handler}
           className={'material-icons'}>arrow_upward</i>
        {downvotes}
        <i onClick={downvote_handler}
           className={'material-icons'}>arrow_downward</i>
        {ital('Posted by: ')} {employer}, {ital('location: ')} {location}
      </p>
      <p style={{paddingLeft:'15px'}}>
        {job_title}
      </p>
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
          all_jobs.map(props => (
            <JobCard upvote_handler={this.upvote}
                     downvote_handler={this.downvote}
                     {...props}
                     key={props.job_descr}
                     />
          ));
    return <div>{postings}</div>;
  }

};
