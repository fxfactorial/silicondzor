'use strict';

const Twitter = require('twitter');
const env = require('./env');

const client = env.prod ? new Twitter(env.twitter) : null;

module.exports =
  async (msg) => client.post('statuses/update', {status: msg.slice(0, 140)});
