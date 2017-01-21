'use strict';

const schedule = require('node-schedule');
const tweet = require('./tweet-events');
const rule = new schedule.RecurrenceRule;
const env = require('./env');

rule.hour = 5;

module.exports = db => {
  schedule.scheduleJob(rule, function() {
    // Need to read the DB for today's day, if any events then tweet
    // them
    tweet('Hello World tweeted automated');
  });
  
};
