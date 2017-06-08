import React from 'react';
import {filter} from 'lodash';

export const request_opts = body => {
  return {
    method:'post',
    headers: new Headers({
      'Content-Type':'application/json'
    }),
    body:JSON.stringify(body)
  };
};

export const get_query_param_value = (query_param = 'p') => {
  try {
    return +(new URLSearchParams(document.location.search)).get(query_param);
  }
  catch (e) { return 0; }
};

export const nest_comments = (comments, parent_id = null) => {
  // defaults to null just to make it easier to call
  const current_children = filter(comments, {'parent_comment': parent_id});
  // first find the children by current parent_id
  if (current_children.length !== 0) { // if it's not empty (termination case)
    // then for each add new field called children which is actually again is
    // chunk of comments, so can be nested, that's why we recurse over
    // array again
    return current_children.map(current_comment => {
      current_comment.children = nest_comments(comments, current_comment.id)
      return current_comment
    })
  }
  else return undefined // undefined as in this case js will ignore the field
  // I think it needs to be other value though
}

export const calculate_time = timestamp => {
  const now = Math.floor(Date.now() / 1000); // Get timestamp in seconds
  const time_difference = now - timestamp; // Calculate time passed
  // Date now is in milliseconds but timestamps we got are in seconds
  const minute = 60 // seconds;
  const time_passed = Math.floor(time_difference / minute); // get it in minutes
  if(time_passed > 24 * 60) { // older than 1 day
    const days_passed = Math.floor(time_passed / (24 * 60));
    const suffix = days_passed > 1 ? 's' : '';
    // if more than 1 day passed it should be days otherwise day
    return `${days_passed} day${suffix} ago`;
    // 1 day ago or 2/3/4 days ago
  }
  if(time_passed > 60) {
    // same logic as in hours
    const hours_passed = Math.floor(time_passed / 60);
    const suffix = hours_passed > 1 ? 's' : '';
    return `${hours_passed} hour${suffix} ago`;
  }
  // same logic
  const suffix = time_passed > 1 ? 's' : '';
  return `${time_passed} minute${suffix} ago`
}
