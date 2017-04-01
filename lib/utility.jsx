import React from 'react';

export const ital = s => <span style={{fontStyle:'italic'}}>{s}</span>;

export const request_opts = body => {
  return {
    method:'post',
    headers: new Headers({
      'content-type':'application/json'
    }),
    body
  };
};
