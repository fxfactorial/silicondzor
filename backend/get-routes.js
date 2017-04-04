'use strict';

const REST = require('../lib/http-routes').default;

module.exports = (silicon_dzor, db) => {

  silicon_dzor.get(REST.get_news, async (req, res) => {
    const news = [];
    res.end(JSON.stringify(news));
  });

  silicon_dzor.get(REST.get_jobs, async (req, res) => {
    const jobs = await db.all(`select * from job_post`);
    console.log({jobs});
    res.end(JSON.stringify(jobs));
  });

  silicon_dzor.get(REST.get_bugs, async (req, res) => {
    const bugs = await db.all(`select * from bug_post`);
    console.log({bugs});
    res.end(JSON.stringify(bugs));
  });

  silicon_dzor.get(REST.get_events, async (req, res) => {
    const events = await db.all(`select * from event`);
    console.log({events});
    res.end(JSON.stringify(events));
  });

};
