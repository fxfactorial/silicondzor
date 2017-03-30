import React, { Component } from 'react';

class Comment extends Component {
  render(){
    return(
      <div>
        <div style={{color:'#828282'}}>
          name, time
        </div>
        <div style={{ margin: 10, fontSize: 20}}>
          a lot of some text text text
        </div>
      </div>
    );
  }
}

export default class SDDiscussion extends Component {
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
    const renderComments = ['','',''].map((value) => (
      <div>
        <Comment />
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
