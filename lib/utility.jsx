import React from 'react';

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

export const calculate_time = (timestamp) => {
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
