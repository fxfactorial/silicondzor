import React, { Component } from 'react';
import {request_opts} from './utility';
import colors from './colors';

const e = {
  display:'flex',
  flexDirection:'column',
  // Need to adjust this on media query
  minWidth:'350px',
  maxWidth:'500px'
};

const title_style = {
  textAlign:'center', fontSize:'2em', marginBottom:'10px'
};

const text_area_props = {
  autoComplete: true,
  autoFocus: true,
  minLength: 10,
  rows: 20
};

const or_style = {fontWeight:'bold', marginTop:'10px', textAlign:'center'};

const PostSubmit = ({input_change, disabled,
                     url_change, text_change, submit, s}) => (
  <section style={{...e, ...s}}>
    <p style={title_style}>New Post</p>
    <section style={e}>
      <label>Title:</label>
      <input placeholder={'Title for your discussion piece'}
             onChange={input_change}/>
      <label style={{marginTop:'5px'}}>URL:</label>
      <input
        placeholder={'URL to what you want to link to'}
        onChange={url_change}/>
      <p style={or_style}>OR</p>
      <p>Content:</p>
      <textarea {...text_area_props}
                placeholder={'New tech discussion in Armenia'}
                onChange={text_change}/>
      <p style={{textAlign:'center', fontSize:'0.8em', marginTop:'10px'}}>
        Leave URL field blank if submitting a discussion
      </p>
      <button style={{marginTop:'10px'}}
              title={'Must be logged in to be able to submit new posts'}
              disabled={disabled}
              onClick={submit}>Submit post</button>
    </section>
  </section>
);

const JobSubmit = ({s, emply_change, title_change,
                    text_change, disabled, submit}) => (
  <section style={{...e, ...s}}>
    <p style={title_style}>New Job Posting</p>
    <section style={e}>
      <label>Employer:</label>
      <input placeholder={'Hayastan Tech LLC'}
             onChange={emply_change}/>
      <label style={{marginTop:'5px'}}>Salary, can be a range:</label>
      <input
        placeholder={'350.000AMD a month'}
        onChange={title_change}/>
      <p style={or_style}>Job description</p>
      <p>Content:</p>
      <textarea {...text_area_props}
                placeholder={'Looking for great ReactJS programmers in Yerevan'}
                onChange={text_change}/>
      <button style={{marginTop:'10px'}}
              title={'Must be logged in to be able to submit new posts'}
              disabled={disabled}
              onClick={submit}>Post job</button>
    </section>
  </section>
);

const pen_test_spiel =
      'Come pentest our system, find a bug and make Armenia more secure';
const BugBountySubmit = ({s, bug_poster, bounty_amount,
                          content_change, disabled, submit}) => (
  <section style={s}>
    <p style={title_style}>New bug bounty</p>
    <section style={e}>
      <label>Offered by:</label>
      <input placeholder={'Central Bank of Armenia'}
             onChange={bug_poster}/>
      <label style={{marginTop:'5px'}}>Bounty:</label>
      <input
        placeholder={'350.000AMD'}
        onChange={bounty_amount}/>
      <p style={or_style}>Job description</p>
      <p>Content:</p>
      <textarea {...text_area_props}
                placeholder={pen_test_spiel}
                onChange={content_change}/>
      <button style={{marginTop:'10px'}}
              title={'Must be logged in to be able to submit new posts'}
              disabled={disabled}
              onClick={submit}>Post job</button>
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
      tab: 'bug-bounty',
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
      minHeight:'600px',
      marginLeft:'20%',
      marginRight:'20%',
      marginBottom:'1rem',
      display:'flex',
      justifyContent:'center',
      marginTop:'1rem',
      boxShadow: 'inset 0 0 3px #000000',
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
          <p style={this.state.tab === 'bug-bounty'
             ? headerButtonActive : headerButton}
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
