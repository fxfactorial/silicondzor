'use strict';

const FB = require('fb');
const fs = require('fs');
const env = require('./env');
const translateAll = require('./yandex-translate');

FB.options({version: 'v2.8'});

module.exports = {events_every, query_events};

// wrapper for the FB API to get access token each time
const FBReq = (req, cb) => {
  FB.api('oauth/access_token', {
    client_id: env.fb.client_id,
    client_secret: env.fb.client_secret,
    grant_type: 'client_credentials'
  }, res => {
    if (!res || res.error) {
      console.log(!res ? 'error occurred during the token request' : res.error);
      return;
    }
    const { access_token } = res;
    FB.setAccessToken(access_token);
    FB.api(req, cb);
  });
};

function events_every(time, db_promises, tweet) {
  setInterval(() => {
    fs.readFile('./groups.json', 'utf-8', (_, d) => {
      let groups = null;

      // Small chance this is going off while we are editing the file.
      try       { groups = JSON.parse(d);}
      catch (e) { /* Not a big deal, just wait for the next interval */ }

      query_events(groups, db_promises, tweet);

    });
  }, time);
}

function query_events(groups, db_promises, tweet) {
  for (const group_name in groups) {
    const group_id = groups[group_name];
    const now = Math.floor(Date.now() / 1000);
    FBReq(`${group_id}/events?since=${now}`, res => {
      if (!res || !res.data) {
        console.log(`
error occured when requesting a list
of events for ${group_name}, ${JSON.stringify(res)}
`);
        return;
      } else if (res.error) {
        console.log(res.error);
        return;
      }

      res.data.forEach(async (each) => {
        const start = (new Date(each.start_time)).getTime();
        let title = await translateAll(each.name);

	const url = `https://facebook.com/events/${each.id}`;
	// Gives back undefined if no result set
	const record = await
	db_promises
	  .get(`select title from event where id = $id`,
	       {$id:`fb-${each.id}`});
	// If we've never seen it before, let's announce it.
	if (record === undefined)
	  await tweet({title, description:each.description, url});
        db_promises
          .run(`
             insert or replace into event values
             ($title, $all_day, $start, $end, $description, $creator, $url, $id)`, {
               $title: title,
               $all_day: !each.end_time || each.start_time === each.end_time,
               $start: start,
               $end: each.end_time ? (new Date(each.end_time)).getTime() : start,
               $description: each.description,
               $creator: group_name,
               $url: url,
               $id: `fb-${each.id}`
             });
      });
    });
  }
}
