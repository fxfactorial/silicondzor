'use strict';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import Application from '../lib/silicondzor';
import colors from '../lib/colors';
import { calculate_for_all, sort_ranks } from './scoring';

const express = require('express');
const leExpress = require('greenlock-express');
const url = require('url');

const env = require('./env');
const replies = require('../lib/replies').default;
const translateAll = require('./yandex-translate');
const { email_account, email_verify_link,
        email_message, send_mail } = require('./email');
const REST = require('../lib/http-routes').default;

const ui_routes =
      new Set(
        [...require('../lib/http-routes').default
         .ui_routes.map(({to}) => to),
         '/user', '/item', '/faq', '/guidelines', '/news', '/login']
      );

const db_promises = require('./sqlite-promises')('silicondzor.db');

const silicon_dzor = express();

//webpack
import webpack from 'webpack';
const config = require('../webpack.config');
const compiler = webpack(config);
silicon_dzor.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
silicon_dzor.use(require('webpack-hot-middleware')(compiler));

// daemons
let register_email_users = {};
// Drop everyone left every 24 hour, aka link is only good for 48 hour
setInterval(() => register_email_users = {}, 60 * 1000 * 60 * 48);
// Kick off the twitter bot
require('./tweet-bot-service')(db_promises);
// Getting the tech events every 24 Hours
require('./fb-events')
  .events_every(60 * 1000 * 60 * 24, db_promises, require('./tweet-events'));
// Add helmet, serve static in public, favicon, morgan, sessions
require('./middleware')(silicon_dzor);
require('./post-routes')(silicon_dzor, db_promises, register_email_users);
require('./get-routes')(silicon_dzor, db_promises);

// Handle the UI requests
silicon_dzor.use(async (req, res, next) => {

  const g = url.parse(req.url).pathname;
  console.log({URL:req.url, PARAMS: req.query, g});

  if (ui_routes.has(g) === false) next();
  else {
    res.setHeader('Content-Type', 'text/html');
    // Might get fucked by DoS
    const ranked_posts = await calculate_for_all(db_promises);
    const sorted = ranked_posts.sort(sort_ranks);

    const context = {};
    let data = [];

    if (req.query.p !== undefined) {
      console.log(req.query.p);
      const startingPostNumber = +req.query.p * 10 // get a number from string
      data = sorted.slice(startingPostNumber, startingPostNumber + 10);
    } else {
      // Okay fine, we always giving the data, client can just do a
      // fetch to the data they need, but this is easier for the time
      // being. Later on when too many news stories then client can
      // pick what they need.
      data = sorted.slice(0, 10);
    }

    const html = renderToString(
      <StaticRouter
        location={req.url}
        context={context}>
        <Application/>
      </StaticRouter>
    );
    // Is Math.{floor, ceil} useful here?
    if (+req.query.p > (sorted.length / 10)) {
      console.warn(`Page requested, ${+req.query.p}, outside data range`);
      res.redirect('/');
    } else {
      res.end(`
<!doctype html>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<head>
  <title>Tech community of Armenia</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        rel="stylesheet"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <link rel="preload" href="bundle.js" as="script"/>
  <style>
/*  Basic resets for modern browsers */
* { margin:0; padding:0; }
html { box-sizing: border-box; }
*, *:before, *:after { box-sizing: inherit; }
/*  Basic resets for modern browsers */

* { font-family: 'Roboto', sans-serif; }
a { text-decoration:none; }
a:hover {
  transition: color 1.0s ease-out;
  color: black !important;
}
</style>
<script>
  // Bootstrap the process up
  window.__INIT_NEWS__ = ${JSON.stringify(data)};
</script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`);
    }
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
