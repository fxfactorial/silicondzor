import React, { Component } from 'react';
import {request_opts} from './utility';
export default class SDSubmitNews extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      url: '',
      content: '',
      tab: 'post',
    }
    this.titleChange = this.titleChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.submitBugBounty = this.submitBugBounty.bind(this);
    this.changeTabPost = this.changeTabPost.bind(this);
    this.changeTabJob = this.changeTabJob.bind(this);
    this.changeTabBugBounty = this.changeTabBugBounty.bind(this);
  }
  async submitPost(){
    const {title, url, content} = this.state;
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`http://localhost:9090/submit-post`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }
  async submitJob(){
    const {title, url, content} = this.state;
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`http://localhost:9090/submit-job`, send_to_server);
    const answer_json = await answer.json();
    console.log(answer_json);
  }
  async submitBugBounty(){
    const {title, url, content} = this.state;
    const send_to_server = request_opts(JSON.stringify({title, web_url: url, content}));
    const answer = await fetch(`http://localhost:9090/submit-job`, send_to_server); 
    //need to add bug-bounty to sql and server
    const answer_json = await answer.json();
    console.log(answer_json);
  }
  titleChange(e){
    const title = e.currentTarget.value;
    this.setState({title});
  }
  urlChange(e){
    const url = e.currentTarget.value;
    this.setState({url});
  }
  contentChange(e){
    const content = e.currentTarget.value;
    this.setState({content});
  }
  changeTabPost(){this.setState({tab: 'post'})};
  changeTabJob(){this.setState({tab: 'job'})};
  changeTabBugBounty(){this.setState({tab: 'bug-bounty'})};
  render () {
    const titleStyle = {
      fontSize: 40,
      marginBottom: 10,
    };
    const buttonStyle = {
      fontSize: 15,
      padding: 4,
      borderRadius: 3,
      marginTop: 10
    };
    const headerButton = {
      width: '32%', 
      textAlign: 'center', 
      backgroundColor:'#2C3D54', 
      color: 'white', 
      cursor: 'pointer'
    }
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', height: 50, alignItems: 'center'}}>
          <div style={headerButton} onClick={this.changeTabPost}>Submit Post</div>
          <div style={headerButton} onClick={this.changeTabJob}>Submit Job</div>
          <div style={headerButton} onClick={this.changeTabBugBounty}>Submit Bug-Bounty</div>
        </div>
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

      </div>
    );
  }
};
