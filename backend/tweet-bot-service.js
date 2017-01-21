'use strict';

const schedule = require('node-schedule');
const tweet = require('./tweet-events');
const rule = new schedule.RecurrenceRule;
const env = require('./env');

rule.hour = 5;

module.exports = db => {
  schedule.scheduleJob(rule, async function() {
    // Need to read the DB for today's day, if any events then tweet
    // them
    let events =
	await db.all(`
select * from event 
    where start = (select max(start) from event WHERE start < DATE('now'))
`);
    Promise.all(
      events.map(({title, description, url}) =>
		 tweet({title, description, url }, false))
    );
  });
  
};
