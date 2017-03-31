import React, { Component } from 'react';
import {request_opts} from './utility';
import colors from './colors';

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
      color: 'white', cursor: 'pointer', minHeight:'40px', paddingTop:'10px',
      color:colors.site_colors.active_link
    };

    const s = {
      display: 'flex', marginTop:'0.75rem',
      alignItems: 'center', justifyContent: 'center'
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

        <div style={this.state.tab === 'post' ? {display: 'block'} : {display: 'none'}}>
          <div style={titleStyle}>
            Submit Post
          </div>
          <div style={{fontSize: 20}}>
            title:
            <input onChange={this.titleChange}/>
          </div>
          <div style={{fontSize: 20}}>
            url:
            <input onChange={this.urlChange}/>
          </div>
          <div style={{fontSize: 20}}>
            OR
          </div>
          <div>
            <div style={{fontSize: 20}}>
              text:
            </div>
            <textarea onChange={this.contentChange} style={{width: 500, height: 200}} />
          </div>
          <button style={buttonStyle} onClick={this.submitPost}>
            submit post
          </button>
        </div>

        <div style={this.state.tab === 'job' ? {display: 'block'} : {display: 'none'}}>
          <div style={titleStyle}>
            Submit Job
          </div>
          <div style={{fontSize: 20}}>
            title:
            <input onChange={this.titleChange}/>
          </div>
          <div style={{fontSize: 20}}>
            url:
            <input onChange={this.urlChange}/>
          </div>
          <div style={{fontSize: 20}}>
            OR
          </div>
          <div>
            <div style={{fontSize: 20}}>
              text:
            </div>
            <textarea onChange={this.contentChange} style={{width: 500, height: 200}} />
          </div>
          <button style={buttonStyle} onClick={this.submitJob}>
            submit job
          </button>
        </div>

        <div style={this.state.tab === 'bug-bounty' ? {display: 'block'} : {display: 'none'}}>
          <div style={titleStyle}>
            Submit Bug-Bounty
          </div>
          <div style={{fontSize: 20}}>
            title:
            <input onChange={this.titleChange}/>
          </div>
          <div style={{fontSize: 20}}>
            url:
            <input onChange={this.urlChange}/>
          </div>
          <div style={{fontSize: 20}}>
            OR
          </div>
          <div>
            <div style={{fontSize: 20}}>
              text:
            </div>
            <textarea onChange={this.contentChange} style={{width: 500, height: 200}} />
          </div>
          <button style={buttonStyle} onClick={this.submitBugBounty}>
            submit bug-bounty
          </button>
        </div>

        <div style={this.state.tab === 'event' ? {display: 'block'} : {display: 'none'}}>
          <div style={titleStyle}>
            Submit Event
          </div>
          <div style={{fontSize: 20}}>
            title:
            <input onChange={this.titleChange}/>
          </div>
          <div>
            start:
            <select onChange={this.onTimeChangeFrom} value={this.state.start}>
              <option value="">Choose start time</option>
              {this.state.hoursChoice}
            </select>
          </div>
          <div>
            end:
            <select onChange={this.onTimeChangeTo} value={this.state.end}>
              <option value="">Choose end time</option>
              {this.state.hoursChoice}
            </select>
          </div>
          <div style={{fontSize: 20}}>
            url:
            <input onChange={this.urlChange}/>
          </div>
          <div style={{fontSize: 20}}>
            OR
          </div>
          <div>
            <div style={{fontSize: 20}}>
              text:
            </div>
            <textarea onChange={this.contentChange} style={{width: 500, height: 200}} />
          </div>
          <button style={buttonStyle} onClick={this.submitEvent}>
            submit event
          </button>
        </div>

      </div>
    );
  }
};
