import React, { Component } from 'react';
import styled from 'styled-components';

import colors from './colors';
import { ContentWrapper, Icon, Message, SubmitBanner } from './with-style';

const JobCard = (
  {contact_info, employer, downvote_handler, idx,
   upvotes, downvotes, upvote_handler, job_title,
   job_descr, location, salary}) => (
     <section key={job_descr} style={{paddingBottom: '5px'}}>
       <Message>
         {upvotes}
         <Icon onClick={upvote_handler}
               className={'material-icons'}>arrow_upward</Icon>
         <span>{downvotes}</span>
         <Icon onClick={downvote_handler}
               className={'material-icons'}>arrow_downward</Icon>
         Posted by: {employer}, location: {location}
       </Message>
       <hr/>
       <details open={false}>
         <summary>
           <span style={{fontWeight: 300}}>{job_title}</span>
         </summary>
         <span style={{fontWeight: 300}}>{job_descr}</span>
       </details>
     </section>
   );

const JobsWrap = styled.div`
  box-shadow: 3px 3px 0px 0px ${colors.site_colors.banner};
  background-color: ${colors.site_colors.bg};
  min-height: 560px;
  padding: 10px;
`;

export default class SDJobs extends Component {

  downvote = () => {
    console.log('something downvote');
  }

  upvote = () => {
    console.log('something upvote');
  }

  render () {
    const { all_jobs } = this.props;
    const postings =
          all_jobs.map((props, idx) => (
            <JobCard upvote_handler={this.upvote}
                     downvote_handler={this.downvote}
                     {...props}
                     idx={idx + 1}
                     key={props.job_descr}
                     />
          ));
    return (
      <ContentWrapper>
        <SubmitBanner>Tech jobs board</SubmitBanner>
        <JobsWrap>
          {postings}
        </JobsWrap>
      </ContentWrapper>
    );
  }

};
