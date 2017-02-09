// Simple script to run the query events now instead of having to
// reload the server or fiddle with setInterval in production but
// still assumes production environment credentials.

const fs = require('fs');
const env = require('../backend/env');
const sqlite3 = require('sqlite3');
const tweet = require('../backend/tweet-events');
const {query_events} = require('../backend/fb-events');

if (!env.production) {
  throw new Error('Can only be run in production because need prod credentials');
}

fs.readFile('../backend/groups.json', 'utf-8', (_, d) => {
  const groups = JSON.parse(d);
  const db_promises = require
  ('../backend/sqlite-promises')
  (new sqlite3.Database('../silicondzor.db'));
  query_events(groups, db_promises, tweet);
});
