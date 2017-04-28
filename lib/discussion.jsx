import React, { Component } from 'react';
import {request_opts} from './utility';
import store from './sdMobx';

class Comment extends Component {
  render(){
    const {creator, creation_time, content, upvotes, downvotes} = this.props;
    return(
      <div>
        <div>
          creator: {creator} | time:{creation_time} | upvotes: {upvotes} | downvotes: {downvotes}
        </div>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default class SDDiscussion extends Component {
  constructor(){
    super();
    this.state = {
      content: '',
    }
  }
  getComments = async () => {
    const send_to_server = request_opts({post_id : this.props.match.params.id});
    const fetched = await fetch('/get-comments', send_to_server);
    const jsoned = await fetched.json();
    store.current_comments = jsoned;
    this.forceUpdate();
  }
  postComment = async () => {
    const {content} = this.state;
    const post_id = this.props.match.params.id;
    const send_to_server = request_opts({content, post_id});
    const fetched = await fetch('/comment', send_to_server);
    const answer = await fetched.json();
    console.log(answer);
  }
  contentChange = (e) => {
    const content = e.currentTarget.value;
    this.setState({content});
  }
  componentWillMount(){
    this.getComments();
  }
  render() {
    //get post_id from url
    const post_id = this.props.match.params.id;
    //
    //get array of url variables like [{smthreallycool: "123"}, {hey: "123"}]
    //from "?smthreallycool=123&hey=123"

    const query_params = [...new URLSearchParams(search).entries()];

    const {search} = this.props.location;
    //
    const renderComments = store.current_comments.map((value) => (
      <div>
        <Comment {...value}/>
      </div>
    ))
    return (
      <div>
        <div>
          should be a title (and web link)
        </div>
        <div>
          183 points by walterbell 7 hours ago | hide | past |
          web | 70 comments | favorite
        </div>
        <textarea onChange={this.contentChange}></textarea>
        <div>
          <button onClick={this.postComment}>add comment</button>
        </div>
        <div>
          {renderComments}
        </div>
      </div>
    );
  }
};
