'use strict';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import differenceInHours from 'date-fns/difference_in_hours';
import Application from '../lib/silicondzor';
import colors from '../lib/colors';

const express = require('express');
const leExpress = require('greenlock-express');
const url = require('url');

const env = require('./env');
const replies = require('../lib/replies').default;
const translateAll = require('./yandex-translate');
const {email_account, email_verify_link,
       email_message, send_mail} = require('./email');

const REST = require('../lib/http-routes').default;

const ui_routes =
      new Set(
        [...require('../lib/http-routes').default
         .ui_routes.map(({to}) => to),
         '/user', '/item', '/faq', '/guidelines', '/news']
      );

const db_promises = require('./sqlite-promises')('silicondzor.db');

const silicon_dzor = express();
let register_email_users = {};

// daemons
// Drop everyone left every 24 hour, aka link is only good for 24 hour
setInterval(() => register_email_users = {}, 60 * 1000 * 60 * 24);
// Kick off the twitter bot
require('./tweet-bot-service')(db_promises);
// Getting the tech events every 24 Hours
require('./fb-events')
  .events_every(60 * 1000 * 60 * 24,
		db_promises,
		require('./tweet-events'));
// Add helmet, serve static in public, favicon, morgan, sessions
require('./middleware')(silicon_dzor);
require('./post-routes')(silicon_dzor, db_promises);
require('./get-routes')(silicon_dzor, db_promises);

// medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d
const calculate_score = (votes, item_hour_age, gravity=1.8) => {
  return (votes - 1) / Math.pow(item_hour_age + 2, gravity);
};

const calculate_for_all = async (db) => {
  // If this becomes too big then can make another smaller table with
  // the minimum information
  const payload = await db.all('select * from post');
  const ranked = payload.map(elem => {
    const birth = new Date(elem.creation_time);
    const rank = calculate_score(elem.upvotes - elem.downvotes,
                                 differenceInHours(Date.now(), birth));
    return {...elem, rank};
  });
  return ranked;
};


// Handle the UI requests
silicon_dzor.use(async (req, res, next) => {

  const g = url.parse(req.url).pathname;
  console.log({URL:req.url, PARAMS: req.query, g});

  if (ui_routes.has(g) === false) next();
  else {
    res.setHeader('Content-Type', 'text/html');
    const context = {};
    const html = renderToString(
      <StaticRouter
        location={req.url}
        context={context}>
        <Application/>
      </StaticRouter>
    );
    console.log(context);
    // Need to only take enough for the first page, say 10?
    const data = await db_promises.all(`
select
P.id, creation_time, title, content, web_link,
upvotes, downvotes, comment_count, username
from post as P, account as A where P.creator = A.id
limit 10
`);
    console.log(data[0]);
    res.end(`
<!doctype html>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<head>
  <title>Tech community of Armenia</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <link rel="preload" href="bundle.js" as="script"/>
  <style>
/*  Basic resets for modern browsers */
* { margin:0; padding:0; }
html { box-sizing: border-box; }
*, *:before, *:after { box-sizing: inherit; }
/*  Basic resets for modern browsers */

a { text-decoration:none; }

a:hover {
  transition: color 1.0s ease-out;
  color:${colors.site_colors.active_link} !important;
}
.faqs > li { margin-bottom:20px;}
i { vertical-align:bottom; cursor:pointer}

</style>
<script>
  // Bootstrap the process up
  window.__INIT_NEWS__ = ${JSON.stringify(data)}
</script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`);
  }

});

// silicon_dzor.get(REST.new_account_verify, (req, res) => {
//   const { identifier } = req.params;
//   const { username } = register_email_users[identifier];
//   db_promises
//     .run(`update account set is_verified = 1 where email = $username`,
// 	 { $username:username })
//     .then(() => {
//       delete register_email_users[username];
//       req.session.logged_in = true;
//       req.session.username = username;
//       res.redirect('/');
//     })
//     .catch(err => {
//       console.error(err);
//       // Need to tell user that email couldn't be verified
//       res.redirect('/');
//     });
// });


// silicon_dzor.post(REST.get_comments, json_pr, form_pr, async (req, res) => {
//   const comments =
//         await db_promises
//         .all(`select * from comment where under_post_id = $post_id`,
//              {$post_id: req.body.post_id});
//   console.log({comments});
//   res.end(JSON.stringify(comments));
// });


// No other handler picked it up yet, so this is our 404 handler
silicon_dzor.use((req, res, next) => {
  res
    .status(404)
    .send(replies.unknown_resource);
});

function approveDomains(options, certs, cb) {
  if (certs) {
    options.domains = certs.altnames;
  }
  else {
    options.email = email_account;
    options.agreeTos = true;
  }
  cb(null, {options, certs});
}

(() => {
  if (env.debug) {
    silicon_dzor
      .listen(env.port, () =>
	      console.log(`Started debug server on ${env.port}, no HTTPS`));
  } else {
    //letsencrypt https
    const lex = leExpress.create({
      server: 'https://acme-v01.api.letsencrypt.org/directory',
      approveDomains,
      challenges: {
	'http-01':
	require('le-challenge-fs')
	  .create({ webrootPath: '/tmp/acme-challenges' })
      },
      store:
      require('le-store-certbot')
	.create({ webrootPath: '/tmp/acme-challenges' })
    });

    // handles acme-challenge and redirects to https
    require('http')
      .createServer(lex.middleware(require('redirect-https')()))
      .listen(env.port, () =>
	      console.log("Listening for ACME http-01 challenges on", env.port));

    // handles silicon_dzor app
    require('https')
      .createServer(lex.httpsOptions, lex.middleware(silicon_dzor))
      .listen(env.port_https, () =>
	      console.log("Listening for ACME tls-sni-01 challenges and serve app on",
			  env.port_https));
  }
})();
