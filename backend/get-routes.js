'use strict';

const REST = require('../lib/http-routes').default;
const { calculate_for_all, sort_ranks } = require('./scoring');

module.exports = (silicon_dzor, db) => {

  silicon_dzor.get(REST.get_news, async (req, res) => {
    console.log('Get more news asked', +req.query.p);
    // stupidly inefficient, need to write a better query
    const ranked_posts = await calculate_for_all(db);
    const sorted = ranked_posts.sort(sort_ranks);
    const starting_point = +req.query.p * 10;
    const news = sorted.slice(starting_point, starting_point + 10);
    console.log(news);
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
