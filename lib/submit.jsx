import React, { Component } from 'react';
import styled from 'styled-components';

import { request_opts } from './utility';
import colors from './colors';
import routes from './http-routes';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { ContentWrapper } from './with-style';

const text_area_props = {
   minLength: 10, rows: 20, autoCapitalize:'sentences'
 };

const PostSubmit = ({input_change, disabled,
                     url_change, text_change, submit, s}) => (
  <section>
    <p>New Post</p>
    <hr/>
    <section>
      <label>Title:</label>
      <input placeholder={'Title for your discussion piece'}
             onChange={input_change}/>
      <label>URL:</label>
      <input
        placeholder={'URL to what you want to link to'}
        onChange={url_change}/>
      <p>OR</p>
      <p>Content:</p>
      <textarea {...text_area_props}
                placeholder={'New tech discussion in Armenia'}
                onChange={text_change}/>
      <p>
        Leave URL field blank if submitting a discussion
      </p>
      <button title={'You must be logged in to be able to submit new posts'}
              disabled={disabled}
              onClick={submit}>Submit post</button>
    </section>
  </section>
);

const react_spiel =
      'We are looking for great ReactJS programmers in Yerevan.';
const job_post_spiel =
      'You must be logged in to be able to submit new job postings.';

const JobSubmit = ({s, emply_change, title_change,
                    location_change, contact_change,
                    text_change, disabled, submit}) => (
  <section>
    <p>New Job Posting</p>
    <hr/>
    <section>
      <label>Employer:</label>
      <input placeholder={'Hayastan Tech LLC'}
             onChange={emply_change}/>
      <label>Salary, can be a range:</label>
      <input
        placeholder={'350.000AMD a month'}
        onChange={title_change}/>

      <label>Location:</label>
      <input
        placeholder={'Yerevan, Armenia'}
        onChange={location_change}/>

      <label>Contact Info:</label>
      <input
        placeholder={'jobs@somehyetechllc.am'}
        onChange={contact_change}/>

      <p>Job description</p>
      <textarea {...text_area_props}
                placeholder={react_spiel}
                onChange={text_change}/>
      <button title={job_post_spiel}
              disabled={disabled}
              onClick={submit}>Post job</button>
    </section>
  </section>
);

const pen_test_spiel =
      'Come pentest our system, find a bug and make Armenia more secure.';
const tech_event_spiel =
      'You must be logged in to be able to submit new tech events.';

const BugBountySubmit = ({s, bug_poster, bounty_amount,
                          content_change, disabled, submit}) => (
  <section>
    <p>New Bug Bounty</p>
    <hr/>
    <section>
      <label>Offered by:</label>
      <input placeholder={'Central Bank of Armenia'}
             onChange={bug_poster}/>
      <label>Bounty:</label>
      <input
        placeholder={'350.000AMD'}
        onChange={bounty_amount}/>
      <p>Content:</p>
      <textarea {...text_area_props}
                placeholder={pen_test_spiel}
                onChange={content_change}/>
      <button title={'You must be logged in to be able to submit new posts.'}
              disabled={disabled}
              onClick={submit}>Post bug bounty
      </button>
    </section>
  </section>
);

const TechEventSubmit = ({s, time_start, time_end,
                          creator, content, disabled, submit}) =>
      (
        <section>
          <p>New Tech Event</p>
          <hr/>
          <section>

            <section>

        <section>
          <label>Start time:</label>
          <select onChange={time_start}>
            <option>---</option>
          </select>
        </section>

        <section>
          <label>End time:</label>
          <select onChange={time_end}>
            <option>---</option>
          </select>
        </section>

      </section>

      <section>
        <label>Creator or group name:</label>
        <input placeholder={'Event host'}
               onChange={creator}/>
        <section>
          <label>Event Description:</label>
          <textarea {...text_area_props}
                    placeholder={'ISTC is hosting...'}
                    onChange={content}/>
        </section>
        <button title={tech_event_spiel}
                disabled={disabled}
                onClick={submit}>
          Post tech event
        </button>
      </section>

    </section>
  </section>
);

const POST_TAB = 'post';
const JOB_TAB = 'job';
const EVENT_TAB = 'event';
const BUG_BOUNTY_TAB = 'bug bounty';
const all_tabs = [POST_TAB, JOB_TAB, EVENT_TAB, BUG_BOUNTY_TAB];

const SubmissionContent = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitBanner = styled.h1`
  padding-top: 10px;
  font-weight: 300;
  font-size: 34px;
  padding-bottom: 10px;
`;

// Right down left up
const SubmissionBox = styled.div`
  padding-top: 10px;
  box-shadow: 3px 3px 0px 0px ${colors.site_colors.banner};
  background-color: ${colors.site_colors.text};
  min-height: 500px;
  min-width: 420px;
`;

const TabBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  background-color: ${colors.site_colors.bg};
`;

const TabItem = styled.p`
  border-style: ${props => props.selected ? 'inset' : 'outset'};
  padding: 5px;
  cursor: pointer;
  color: ${colors.site_colors.title};
`;

export default @observer class SDSubmitNews extends Component {

  @observable tab_index = 0;

  @observable post = {
    title: '', content: ''
  }

  @computed get tab() { return all_tabs[this.tab_index]; }

  tab_select = e => this.tab_index = all_tabs.indexOf(e.target.textContent);

  render () {
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
        </SubmissionBox>
      </SubmissionContent>
    );
  }
};
