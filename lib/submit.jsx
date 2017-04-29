import React, { Component } from 'react';
import styled from 'styled-components';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

import { request_opts } from './utility';
import colors from './colors';
import routes from './http-routes';
import { ContentWrapper, TextArea, PostSubmission, RowField,
         Input, Message, SubmissionButton, SubmissionContent,
         SubmitBanner, SubmissionBox, TabBar, TabItem
       } from './with-style';

const text_area_props = {
  minLength: 10, rows: 15, autoCapitalize:'sentences', cols: 75
};

const b_title = 'You must be logged in to be able to submit new posts';

const PostSubmit =
      ({input_change, disabled,
        url_change, text_change, submit, s}) => {
          return (
            <PostSubmission>
              <Message>New Post</Message>
              <hr style={{width: '90%'}}/>

              <section>
                <PostSubmission>

                  <RowField>
                    <label>Title:</label>
                    <Input placeholder={'Title for your discussion piece'}
                           onChange={input_change}/>
                  </RowField>

                  <RowField>
                    <label>URL:</label>
                    <Input
                      placeholder={'URL to what you want to link to'}
                      onChange={url_change}/>
                  </RowField>

                  <Message>OR</Message>
                  <Message>Content</Message>

                  <TextArea {...text_area_props}
                            placeholder={'New tech discussion in Armenia'}
                            onChange={text_change}/>
                  <Message>
                    Leave URL field blank if submitting a discussion
                  </Message>
                  <SubmissionButton title={b_title}
                                    disabled={disabled}
                                    onClick={submit}>
                    Submit post</SubmissionButton>
                </PostSubmission>

              </section>
            </PostSubmission>
          );
        };

const react_spiel =
      'We are looking for great ReactJS programmers in Yerevan.';
const job_post_spiel =
      'You must be logged in to be able to submit new job postings.';

const RowFieldWidth = styled(RowField)`
  min-width: 500px;
`;

const JobSubmit = ({s, emply_change, title_change,
      location_change, contact_change,
      text_change, disabled, submit}) => (
        <PostSubmission>
          <Message>New Job Posting</Message>
          <hr style={{width: '90%'}}/>
          <PostSubmission>
            <RowFieldWidth>
              <label>Employer:</label>
              <Input placeholder={'Hayastan Tech LLC'}
                     onChange={emply_change}/>
            </RowFieldWidth>
            <RowFieldWidth>
              <label>Salary</label>
              <Input
                placeholder={'350.000AMD a month'}
                onChange={title_change}/>
            </RowFieldWidth>

            <RowFieldWidth>
              <label>Location:</label>
              <Input
                placeholder={'Yerevan, Armenia'}
                onChange={location_change}/>
            </RowFieldWidth>

            <RowFieldWidth>
              <label>Contact Info:</label>
              <Input
                placeholder={'jobs@somehyetechllc.am'}
                onChange={contact_change}/>
            </RowFieldWidth>

            <Message>Job description</Message>
            <div style={{paddingTop: '10px'}}>
              <TextArea {...text_area_props}
                        placeholder={react_spiel}
                        onChange={text_change}/>
            </div>
            <SubmissionButton title={job_post_spiel}
                              disabled={disabled}
                              onClick={submit}>
              Post job
            </SubmissionButton>
          </PostSubmission>
        </PostSubmission>
      );

const pen_test_spiel =
      'Come pentest our system, find a bug and make Armenia more secure.';
const tech_event_spiel =
      'You must be logged in to be able to submit new tech events.';
const new_post_spiel =
      'You must be logged in to be able to submit new posts.';

const BugBountySubmit = ({s, bug_poster, bounty_amount,
                          content_change, disabled, submit}) =>
      (
        <PostSubmission>
          <Message>New Bug Bounty</Message>
          <hr style={{width: '90%'}}/>
          <PostSubmission>
            <RowField>
              <label>Offered by:</label>
              <input placeholder={'Central Bank of Armenia'}
                     style={{minWidth: '200px'}}
                     onChange={bug_poster}/>
            </RowField>
            <RowField>
              <label>Bounty:</label>
              <input
                style={{minWidth: '200px'}}
                placeholder={'350.000AMD'}
                onChange={bounty_amount}/>
            </RowField>
            <Message>Content:</Message>

            <TextArea {...text_area_props}
                      placeholder={pen_test_spiel}
                      onChange={content_change}/>
            <SubmissionButton title={new_post_spiel}
                    disabled={disabled}
                    onClick={submit}>Post bug bounty
            </SubmissionButton>
          </PostSubmission>
        </PostSubmission>
      );

const TechEventSubmit = ({s, time_start, time_end,
                          creator, content, disabled, submit}) =>
      (
        <PostSubmission>
          <Message>New Tech Event</Message>
          <hr style={{width: '90%'}}/>
          <PostSubmission>
            <RowField>
              <label>Start time:</label>
              <select
                style={{minWidth: '150px'}}
                onChange={time_start}>
                <option>---</option>
              </select>
            </RowField>

            <RowField>
              <label>End time:</label>
              <select
                style={{minWidth: '150px'}}
                onChange={time_end}>
                <option>---</option>
              </select>
            </RowField>

            <PostSubmission>
              <RowField>
                <label>Creator or group name:</label>
                <input placeholder={'Event host'}
                       onChange={creator}/>
              </RowField>
              <TextArea {...text_area_props}
                        placeholder={'Event Description'}
                        onChange={content}/>
              <SubmissionButton title={tech_event_spiel}
                                disabled={disabled}
                                onClick={submit}>
                Post tech event
              </SubmissionButton>
            </PostSubmission>

          </PostSubmission>
        </PostSubmission>
      );

const POST_TAB = 'post';
const JOB_TAB = 'job';
const EVENT_TAB = 'event';
const BUG_BOUNTY_TAB = 'bug bounty';
const all_tabs = [POST_TAB, JOB_TAB, EVENT_TAB, BUG_BOUNTY_TAB];

export default @observer class SDSubmitNews extends Component {

  @observable tab_index = 3;

  @observable post = {
    title: '', content: ''
  }

  @computed get tab() { return all_tabs[this.tab_index]; }

  tab_select = e => this.tab_index = all_tabs.indexOf(e.target.textContent);

  render () {
    let content = null;
    switch(this.tab_index) {
    case 0: content = <PostSubmit/>; break;
    case 1: content = <JobSubmit/>; break;
    case 2: content = <TechEventSubmit/>; break;
    default:
      content = <BugBountySubmit/>;
    }

    const tabs =
      all_tabs.map(tab => (
        <TabItem selected={tab === this.tab ? true : false}
                 onClick={this.tab_select}
                 key={tab}>{tab}</TabItem>
      ));
    return (
      <SubmissionContent>
        <SubmitBanner>Submit Content</SubmitBanner>
        <SubmissionBox>
          <TabBar>{tabs}</TabBar>
          {content}
        </SubmissionBox>
      </SubmissionContent>
    );
  }
};
