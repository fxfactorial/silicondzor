import React from 'react';
import styled from 'styled-components';

const Italic = styled.span`
  font-family: italic;
`;

export const ital = s => <Italic>{s}</Italic>;

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
