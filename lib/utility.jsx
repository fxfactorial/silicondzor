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
