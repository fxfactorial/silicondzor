'use strict';

import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import Application from '../lib/silicondzor';

const express = require('express');
const leExpress = require('letsencrypt-express');
const uuid_v4 = require('uuid/v4');
const body_parser = require('body-parser');
const crypto = require('crypto');
const xssFilters = require('xss-filters');

const env = require('./env');
const replies = require('../lib/replies').default;
const bcrypt_promises = require('./bcrypt-promise');
const translateAll = require('./yandex-translate');
const {email_account, email_verify_link,
       email_message, send_mail} = require('./email');

const REST = require('../lib/http-routes').default;

const ui_routes =
      new Set(
        require('../lib/http-routes').default
          .ui_routes.map(({to}) => to)
      );

const db_promises = require('./sqlite-promises')('silicondzor.db');

const json_pr = body_parser.json();
const form_pr = body_parser.urlencoded({extended: true});
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

// Handle the UI requests
silicon_dzor.use((req, res, next) => {

  if (ui_routes.has(req.url) === false) next();
  else {
    res.setHeader('Content-Type', 'text/html');

    const context = {};
    const events = [
      {field:'123'},
      {field: '1rrr'}
    ];
    const html = renderToString(
      <StaticRouter
        location={req.url}
        context={context}>
        <Application event_data={events}/>
      </StaticRouter>
    );

    res.end(`
<!doctype html>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<head>
  <title>Silicondzor</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <link href="styles.css" rel="stylesheet" type="text/css"/>
  <link rel="preload" href="bundle.js" as="script"/>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`);
  }

});

silicon_dzor.post(REST.new_account, json_pr, form_pr, async (req, res) => {
  const {username, password} = req.body;

  const email_query =
	await db_promises
	.get(`select email from account where email = $email`,
  	     {$email:username});

  if (email_query) {
    res.end(replies.fail(replies.invalid_username_already_picked));
    return;
  }

  const identifier = uuid_v4();
  register_email_users[identifier] = {username, identifier};
  const verify_link = email_verify_link(identifier);

  const hash = await bcrypt_promises.hash(password, 10);
  try {
    await db_promises
      .run(`insert into account (email, hashed_password) values ($e, $h)`,
	   { $e: username, $h: hash});
    const mail_opts = {
      from: 'Silicondzor.com <iteratehackerspace@gmail.com> ',
      to: username,
      subject: 'Verify account -- Silicondzor.com',
      text: email_message(username, verify_link, false),
      html: email_message(username, verify_link)
    };
    await send_mail(mail_opts);
    res.setHeader('content-type', 'application/json');
    res.end(replies.ok());
  } catch (err) {
    res.end(replies.fail(err.msg));
  }
});

silicon_dzor.post(REST.sign_in, json_pr, form_pr, async (req, res) => {
  const {username, password} = req.body;
  req.session.logged_in = false;
  try {
    const row =
	  await db_promises
	  .get(`
select hashed_password from account where email = $e and is_verified = 1`,
	       {$e:username});
    try {
      await bcrypt_promises.compare(password, row.hashed_password);
      req.session.logged_in = true;
      req.session.username = username;
      res.end(replies.ok());
    }
    catch (err) {
      res.end(replies.fail(replies.invalid_credentials));
    }
  } catch (err) {
    res.end(replies.fail(replies.invalid_email));
  }
});

silicon_dzor.get(REST.new_account_verify, (req, res) => {
  const { identifier } = req.params;
  const { username } = register_email_users[identifier];
  db_promises
    .run(`update account set is_verified = 1 where email = $username`,
	 { $username:username })
    .then(() => {
      delete register_email_users[username];
      req.session.logged_in = true;
      req.session.username = username;
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      // Need to tell user that email couldn't be verified
      res.redirect('/');
    });
});
silicon_dzor.post(REST.submit_post, json_pr, form_pr, async (req, res) => {
  try {
    if (req.session.logged_in) {
      const b = req.body;
      const query_result =
	    await db_promises
	    .get(`select * from account where email = $username and is_verified = 1`,
		 {$username: req.session.username});
      const id =
	    crypto
	    .createHash('sha256')
	    .update(b.title + b.creation_time + query_result.id)
	    .digest('hex');
      await db_promises.run(`insert into post (creator, id, creation_time, title, content, web_link) values
($creator, $id, $creation_time, $title, $content, $web_link)`, {
  $title: xssFilters.inHTMLData(b.title),
  $creation_time: (new Date()).getTime(),
  $content: xssFilters.inHTMLData(b.content),
  $web_link: b.web_link,
  $creator:query_result.id,
  $id: id
});
      res.end(replies.ok());
    } else {
      res.end(replies.fail(replies.invalid_session));
    }
  } catch (err) {
    res.end(replies.fail(err.msg));
  }
})
silicon_dzor.post(REST.submit_job, json_pr, form_pr, async (req, res) => {
  try {
    if (req.session.logged_in) {
      const b = req.body;
      const query_result =
	    await db_promises
	    .get(`select * from account where email = $username and is_verified = 1`,
		 {$username: req.session.username});
      const id =
	    crypto
	    .createHash('sha256')
	    .update(b.title + b.creation_time + query_result.id)
	    .digest('hex');
      await db_promises.run(`insert into post (creator, id, creation_time, title, content, web_link) values
($creator, $id, $creation_time, $title, $content, $web_link)`, {
  $title: xssFilters.inHTMLData(b.title),
  $creation_time: (new Date()).getTime(),
  $content: xssFilters.inHTMLData(b.content),
  $web_link: b.web_link,
  $creator:query_result.id,
  $id: id
});
      res.end(replies.ok());
    } else {
      res.end(replies.fail(replies.invalid_session));
    }
  } catch (err) {
    res.end(replies.fail(err.msg));
  }
})
silicon_dzor.post(REST.add_tech_event, json_pr, async (req, res) => {
  try {
    if (req.session.logged_in) {
      const b = req.body;
      let title = await translateAll(b.event_title);
      const query_result =
	    await db_promises
	    .get(`select * from account where email = $username and is_verified = 1`,
		 {$username: req.session.username});
      const id =
	    crypto
	    .createHash('sha256')
	    .update(b.event_title + b.start + query_result.id)
	    .digest('hex');
      await db_promises.run(`insert into event values
($title, $all_day, $start, $end, $description, $creator, $url, $id)`, {
  $title: xssFilters.inHTMLData(title),
  $all_day: new Date(b.start) === new Date(b.end),
  $start:(new Date(b.start)).getTime(),
  $end:(new Date(b.end)).getTime(),
  $description: xssFilters.inHTMLData(b.event_description),
  $creator:query_result.id,
  $url: `https://silicondzor.com/${id}`, // TODO: use the url for linking
  $id: id
});
      res.end(replies.ok());
    } else {
      res.end(replies.fail(replies.invalid_session));
    }
  } catch (err) {
    res.end(replies.fail(err.msg));
  }
});

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
