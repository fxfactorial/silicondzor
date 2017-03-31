import React, { Component } from 'react';
import {request_opts} from './utility';
import colors from './colors';

const PostSubmit = ({input_change, url_change, text_change, submit, s}) => (
  <section style={s}>
    <p> New Post </p>
    <section>
      <label>Title:</label>
      <input onChange={input_change}/>
      <label>URL:</label>
      <input onChange={url_change}/>
      <p style={{fontWeight:'bold'}}> OR </p>
      <p>Text:</p>
      <textarea onChange={text_change} style={{width: 500, height: 200}}/>
    </section>
    <button onClick={submit}>Submit post</button>
  </section>
);

const JobSubmit = ({s, emply_change, title_change, submit, text_change}) => (
  <section style={s}>
    <p>Submit a new Job posting</p>
    <section>
      <label>Employer:</label>
      <input onChange={emply_change}/>
      <label>Job Description:</label>
      <input onChange={title_change}/>
      <p>Job Description</p>
      <textarea onChange={text_change} style={{width: 500, height: 200}}/>
    </section>
    <button onClick={submit}>Submit job posting</button>
  </section>
);

const BugBountySubmit = ({s, bug_poster}) => (
  <section style={s}>
    <p>Create a new bug bounty </p>
    <section>
      <label>Poster:</label>
      <input onChange={bug_poster}/>
      <label>bounty:</label>
      <input type={'number'}/>
    </section>
  </section>
);

const TechEventSubmit = ({s, time_change}) => (
  <section style={s}>
    <p>New tech Event</p>
    <section>
      <label>Start time:</label>
      <select onChange={time_change}>
        <option value={""}>Choose start time</option>
      </select>
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
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`/submit-post`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitJob = async () => {
    const {title, url, content} = this.state;
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`/submit-job`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitBugBounty = async () => {
    const {title, url, content} = this.state;
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`/submit-job`, send_to_server);
    //need to add bug-bounty to sql and server
    const answer_json = await answer.json();
    console.log(answer_json);
  }

  submitEvent = async () => {
    const {title, url, content, start, end} = this.state;
    const send_to_server = request_opts(JSON.stringify({
      event_title: title,
      event_description: content,
      start,
      end,
      web_url: url,
      content
    }));
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

    const titleStyle = {fontSize: 40, marginBottom: 10};

    const buttonStyle = {
      fontSize: 15, padding: 4, borderRadius: 3, marginTop: 10
    };

    const headerButton = {
      width: '15%', textAlign: 'center', backgroundColor:'#2C3D54',
      color: 'white', cursor: 'pointer', minHeight:'40px', paddingTop:'10px'
    };

    const headerButtonActive = {
      borderStyle:'outset', fontWeight:'bold',
      width: '15%', textAlign: 'center', backgroundColor:'#2C3D54',
      color: 'white', cursor: 'pointer', minHeight:'40px', paddingTop:'7px',
      color:colors.site_colors.active_link
    };

    const s = {
      display: 'flex', marginTop:'0.75rem',
      alignItems: 'center', justifyContent: 'center'
    };

    const submit_content = {
      minHeight:'400px',
      marginLeft:'3rem',
      marginRight:'3rem',
      marginBottom:'1rem',
      display:'flex',
      justifyContent:'center',
      marginTop:'1rem',
      textIndent:'2rem',
      boxShadow: 'inset 0 0 10px #000000',
      padding:'1.5em 1.5em 1.5em 1.5em'
    };

    return (
      <div>

        <section style={s}>
          <p style={this.state.tab === 'post' ? {
               ...headerButtonActive,
               borderTopLeftRadius: 7,
               borderBottomLeftRadius: 7
               } : {
                 ...headerButton,
                 borderTopLeftRadius: 7,
                 borderBottomLeftRadius: 7
             }} onClick={this.tab_change.bind(null, 'post')}>
            Post
          </p>
          <p style={this.state.tab === 'job' ? headerButtonActive : headerButton}
             onClick={this.tab_change.bind(null, 'job')}>
            Job
          </p>
          <p style={this.state.tab === 'bug-bounty' ? headerButtonActive : headerButton}
             onClick={this.tab_change.bind(null, 'bug-bounty')}>
            Bug-Bounty
          </p>
          <p style={this.state.tab === 'event' ? {
               ...headerButtonActive,
               borderTopRightRadius: 7,
               borderBottomRightRadius: 7
               } : {
                 ...headerButton,
                 borderTopRightRadius: 7,
                 borderBottomRightRadius: 7
             }} onClick={this.tab_change.bind(null, 'event')}>
            Event
          </p>
        </section>

        <section style={submit_content}>
          <PostSubmit
            s={this.state.tab === 'post' ? {display: 'block'} : {display: 'none'}}
            url_change={this.urlChange}
            text_change={this.contentChange}
            submit={this.submitPost}
            input_change={this.titleChange}/>

          <JobSubmit
            s={this.state.tab === 'job' ? {display: 'block'} : {display: 'none'}}
            employer_change={this.employer_change}
            job_title_change={this.job_title_change}
            submit_job={this.job_submit}
            />

          <BugBountySubmit
            s={this.state.tab === 'bug-bounty' ? {display: 'block'} : {display: 'none'}}
            />

          <TechEventSubmit
            s={this.state.tab === 'event' ? {display: 'block'} : {display: 'none'}}
            />

        </section>
      </div>
    );
  }
};
