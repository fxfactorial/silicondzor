import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import {request_opts, get_query_param_value,
        calculate_time, nest_comments} from './utility';
import store from './sdMobx';
import { StyledLink, ContentWrapper, NewsHeadLine,
         ByLine, Icon, BoxShadowWrap, SubmitBanner,
         PaddedTextArea, SubmitCommentButton, CommentHeader
       }
from './with-style';

const localStore = new (class {
  constructor() {
    extendObservable(this, {
      content: '',
      current_post_data: {},
      current_comments: [],
    });
  }
});

class Comment extends Component {
  render(){
    const {
      content, creation_time, creator,
      downvotes, id, parent_comment, upvotes, children
    } = this.props;
    const children_comments = !children ? null :
      children.map(comment => <Comment key={comment.id} {...comment} />)
    return(
      <CommentHeader>
        <Icon onClick={this.up_vote}
              className={'material-icons'}>arrow_upward</Icon>
        <div>
          <p>
            <a href='#'>{creator}</a> <a>{calculate_time(creation_time)}</a>
          </p>
          <div>
            {content}
            {children_comments}
          </div>
        </div>
      </CommentHeader>
    );
  }
}

export default class SDDiscussion extends Component {
  getComments = async () => {
    const {search} = this.props.location;
    const post_id = get_query_param_value('id');
    const send_to_server = request_opts({post_id});
    const fetched = await fetch('/get-comments', send_to_server);
    const flat_comments = await fetched.json();
    store.current_comments = nest_comments(flat_comments);
    this.forceUpdate();
  }

  postComment = async () => {
    const {content} = localStore;
    const post_id = this.props.match.params.id;
    const send_to_server = request_opts({content, post_id});
    const fetched = await fetch('/comment', send_to_server);
    const answer = await fetched.json();
    console.log(answer);
  }
  contentChange = (e) => {
    localStore.content = e.currentTarget.value;
  }

  componentWillMount(){
    this.getComments();
  }
  componentDidMount() {
    localStore.current_post_data = this.props.location.state;
  }
  render() {
    const {
      creator, title, comment_count,
      creation_time, web_link,
      upvotes, id
    } = localStore.current_post_data;
    //
    const renderComments = !store.current_comments ? null :
    store.current_comments.map((value, idx) => (
        <div key={idx}>
          <Comment {...value} />
        </div>
    ));

    const byline = (
      <ByLine>
        <span>
          {upvotes} points by <a href='#'>{creator}</a>{' '}
          <a>{calculate_time(creation_time)}</a>
        </span> |
        <a href='#'>hide</a> |
        <a href='#'>past</a> |
        <a href={web_link}>web</a> |
        <a href='#'>{comment_count} comments</a> |
        <a href='#'>favorite</a>
      </ByLine>
    );
    return (
      <ContentWrapper>
        <BoxShadowWrap>
          <div>
            <NewsHeadLine>
              <p>
                <Icon onClick={this.up_vote}
                      className={'material-icons'}>arrow_upward</Icon>
                {title} (<a href={web_link}>{web_link}</a>)
              </p>
            </NewsHeadLine>
            <hr/>
            {byline}
          </div>


          <PaddedTextArea
            onChange={this.contentChange}
            rows='6'
            cols='60'
          ></PaddedTextArea>

          <div>
            <SubmitCommentButton onClick={this.postComment}>
              add comment
            </SubmitCommentButton>
          </div>
          <br />
          <br />
          <div>
            {renderComments}
          </div>
        </BoxShadowWrap>
      </ContentWrapper>
    );
  }
};
