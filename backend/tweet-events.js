'use strict';

const Twitter = require('twitter');
const env = require('./env');

const client = env.production ? new Twitter(env.twitter) : null;

module.exports =
  async ({title, description, url}, new_event=true) =>
  client.post('statuses/update', {
    status: new_event ?
      (() => {
	const s =
	      `
New event on silicondzor.com ${title.slice(0, 20)}, ${description.slice(0, 25)}
`;
	return `${s}${url.slice(0, 140 - s.length)}`;
      })() :
      (() => {
	const s =
	      `
Today's tech in Armenia: ${title.slice(0, 20)}, ${description.slice(0, 25)}...
`;
	return `${s}${url.slice(0, 140 - s.length)}`;
      })()

  });
