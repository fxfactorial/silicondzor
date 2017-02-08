'use strict';

const schedule = require('node-schedule');
const tweet = require('./tweet-events');
const rule = new schedule.RecurrenceRule;
const env = require('./env');

rule.hour = 5;

module.exports = db => {
  schedule.scheduleJob(rule, async function() {

    if (env.production) {
      // Need to read the DB for today's day, if any events then tweet
      // them
      let events =
	  await db.all(`select * from event where start = DATE('now')`);
      Promise.all(
	events
	  .map(({title, description, url}) =>
	       Promise.all(title.split('/')
			   // We tweet out in 3 languages
			   .map(in_lang =>
				tweet({title:in_lang, description, url}, false)))));
    };
  });
};
