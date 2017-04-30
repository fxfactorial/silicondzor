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

export const document_current_page = () => {
  try { return +(new URLSearchParams(document.location.search)).get('p'); }
  catch (e) { return 0; }
};
