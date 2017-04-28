import React, { Component } from 'react';
import styled from 'styled-components';

import { request_opts } from './utility';
import colors from './colors';
import routes from './http-routes';

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

export default
class SDSubmitNews extends Component {

  constructor(){
    super();
    this.state = {
      title: '',
      url: '',
      content: '',
      tab: 'post',
      start: '',
      end: '',
      hoursChoice: []
    };
    let makeHoursChoice = [];
    for (let i = 0; i <= 48; ++i) {
      if (i === 48) {
        this.state.hoursChoice = makeHoursChoice;
      } else if (i-Math.round(i/2) < 10 && i % 2 == 0) {
        makeHoursChoice.push((
          <option key={i}
                  value={`0${i-Math.round(i/2)}:00`}>
            0{i-Math.round(i/2)}:00
          </option>));
      } else if (i-Math.round(i/2) < 10 && i % 2 == 1) {
        makeHoursChoice.push((
          <option key={i}
                  value={`0${i-Math.round(i/2)}:30`}>
            0{i - Math.round(i / 2)}:30
          </option>));
      } else if (i-Math.round(i/2) >= 10 && i % 2 == 0) {
        makeHoursChoice.push((
          <option key={i}
                  value={`${i-Math.round(i/2)}:00`}>
            {i-Math.round(i/2)}:00
          </option>));
      } else if (i-Math.round(i/2) >= 10 && i % 2 == 1) {
        makeHoursChoice.push((
          <option key={i}
                  value={`${i-Math.round(i/2)}:30`}>
            {i-Math.round(i/2)}:30
          </option>));
      }
    }
  }

  submitPost = async () => {
    const {title, url, content} = this.state;
    const send_to_server = request_opts({title, web_url: url, content});
    const answer = await fetch(routes.post.submit_post, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitJob = async () => {
    const {title, url, content} = this.state;
    const send_to_server = request_opts({title, web_url: url, content});
    const answer = await fetch(`/submit-job`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitBugBounty = async () => {
    const {title, url, content} = this.state;
    const send_to_server = request_opts({title, web_url: url, content});
    const answer = await fetch(`/submit-job`, send_to_server);
    //need to add bug-bounty to sql and server
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitEvent = async () => {
    const {title, url, content, start, end} = this.state;
    const send_to_server = request_opts({
      event_title: title,
      event_description: content,
      start,
      end,
      web_url: url,
      content
    });
    const answer = await fetch(`/submit-job`, send_to_server);
    //need to add web_url to server and sql
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  titleChange = (e) => {
    const title = e.currentTarget.value;
    this.setState({title});
  }

  urlChange = (e) => {
    const url = e.currentTarget.value;
    this.setState({url});
  }

  contentChange = (e) => {
    const content = e.currentTarget.value;
    this.setState({content});
  }

  onTimeChangeFrom = (e) => {
    const time = e.currentTarget.value;
    this.setState({ start: time });
  }

  onTimeChangeTo = (e) => {
    const time = e.currentTarget.value;
    this.setState({ end: time });
  }

  tab_change = tab => this.setState({tab});

  render () {

    return (
      <div>

        <section>
          <p style={this.state.tab === 'post' ? {
               borderTopLeftRadius: 7,
               borderBottomLeftRadius: 7
               } : {

                 borderTopLeftRadius: 7,
                 borderBottomLeftRadius: 7
             }} onClick={this.tab_change.bind(null, 'post')}>
            Post
          </p>
          <p onClick={this.tab_change.bind(null, 'job')}>
            Job
          </p>
          <p onClick={this.tab_change.bind(null, 'bug-bounty')}>
            Bug Bounty
          </p>
          <p style={this.state.tab === 'event' ? {
               borderTopRightRadius: 7,
               borderBottomRightRadius: 7
               } : {
                 borderTopRightRadius: 7,
                 borderBottomRightRadius: 7
             }} onClick={this.tab_change.bind(null, 'event')}>
            Event
          </p>
        </section>

        <section>
          <PostSubmit
            s={this.state.tab === 'post'
            ? {display: 'block'} : {display: 'none'}}
            url_change={this.urlChange}
            text_change={this.contentChange}
            disabled={false}
            submit={this.submitPost}
            input_change={this.titleChange}/>

          <JobSubmit
            s={this.state.tab === 'job'
            ? {display: 'block'} : {display: 'none'}}
            emply_change={this.employer_change}
            title_change={this.job_title_change}
            text_change={this.contentChange}
            location_change={this.location_change}
            contact_change={this.contact_change}
            disabled={false}
            submit={this.job_submit}
            />

          <BugBountySubmit
            s={this.state.tab === 'bug-bounty'
            ? {display: 'block'} : {display: 'none'}}
            />

          <TechEventSubmit
            s={this.state.tab === 'event'
            ? {display: 'block'} : {display: 'none'}}
            />

        </section>
      </div>
    );
  }
};
