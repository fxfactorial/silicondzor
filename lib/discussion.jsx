import React, { Component } from 'react';
import {request_opts} from './utility';
import store from './sdMobx';
class Comment extends Component {
  render(){
    console.log(this.props);
    const {creator, creation_time, content, upvotes, downvotes} = this.props;
    return(
      <div>
        <div style={{color:'#828282'}}>
          creator: {creator} | time:{creation_time} | upvotes: {upvotes} | downvotes: {downvotes}
        </div>
        <div style={{ margin: 10, fontSize: 20}}>
          {content}
        </div>
      </div>
    );
  }
}

export default class SDDiscussion extends Component {
  getComments = async () => {
    const send_to_server = request_opts(JSON.stringify({post_id : this.props.match.params.id}));
    const fetched = await fetch('/get-comments', send_to_server);
    const jsoned = await fetched.json();
    store.current_comments = jsoned;
    this.forceUpdate();
  }
  componentWillMount(){
    this.getComments();
  }
  render() {
    //get post_id from url
    const post_id = this.props.match.params.id
    //
    //get array of url variables like [{smthreallycool: "123"}, {hey: "123"}] 
    //from "?smthreallycool=123&hey=123"
    const {search} = this.props.location;
    const arrayOfURLVars = search.substring(1, search.length).split('&').map((value) => {
      const pair = value.split('=');
      let obj = {};
      obj[pair[0]] = pair[1];
      return obj;
    });
    console.log(arrayOfURLVars);
    //
    const renderComments = store.current_comments.map((value) => (
      <div>
        <Comment {...value}/>
      </div>
    ))
    return (
      <div style={{backgroundColor: '#f6f6ef'}}>
        <div style={{fontSize: 25, margin : 20}}>should be a title (and web link)</div>
        <div style={{color:'#828282', margin : 20}}>183 points by walterbell 7 hours ago | hide | past | web | 70 comments | favorite</div>
        <textarea style={{width: 500, height: 200, margin: 20, fontSize: 18}}></textarea>
        <div>
          <button style={{fontSize: 20, margin: 20, padding: 5, borderRadius: 5}}>add comment</button>
        </div>
        <div style={{margin: 20}}>
          {renderComments}
        </div>
      </div>
    );
  }
};
