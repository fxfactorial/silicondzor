'use strict';
/* jshint esversion: 6 */
const env = require('./env');
const express = require('express');
const leExpress = require('letsencrypt-express');
const createElement = require('react').createElement;
const render = require('react-dom/server').renderToString;
const frontend = require('../lib/silicondzor').default;
const email_message = require('../lib/email-form').default;
const replies = require('../lib/replies').default;
const uuid_v4 = require('uuid/v4');
const body_parser = require('body-parser');
const session = require('express-session');
const silicon_dzor = express();
const sqlite3 = env.debug ? require('sqlite3').verbose() : require('sqlite3');
const crypto = require('crypto');
const bcrypt_promises = require('./bcrypt-promise');
const json_pr = body_parser.json();
const form_pr = body_parser.urlencoded({extended: true});
const nodemailer = require('nodemailer');
const tweet = require('./tweet-events');
const xssFilters = require('xss-filters');
const favicon = require('serve-favicon');
const {events_every} = require('./fb-events');
const email_account = 'iteratehackerspace@gmail.com';
const email_password = env.prod ? env.email_password : null;

const email_verify_link = identifier =>
      env.prod
      ? `http://localhost:8080/verify-account/${identifier}`
      : `http://silicondzor.com/verify-account/${identifier}`;

const email_transporter =
      email_password !== null
      ? nodemailer
      .createTransport(`smtps://${email_account}:${email_password}@smtp.gmail.com`)
      : null;

const send_mail = mail_opts => {
  return new Promise((accept, reject) => {
    email_transporter.sendMail(mail_opts, (err, other) => {
      if (err) reject(err);
      else accept();
    });
  });
};
const request_prom = require("request-promise");
const port = env.debug ? 8080 : 80;
const port_https = env.debug ? 8443 : 443;
// Assumes that such a database exists, make sure it does.
const db = new sqlite3.Database('silicondzor.db');
const Routes = require('../lib/routes').default;

const db_promises = require('./sqlite-promises')(db);

let register_email_users = {};

// daemons
// Drop everyone left every 24 hour, aka link is only good for 24 hour
setInterval(() => register_email_users = {}, 60 * 1000 * 60 * 24);
// Kick off the twitter bot
require('./tweet-bot-service')(db_promises);
// Getting the tech events every 24 Hours
events_every(60 * 1000 * 60 * 24, db_promises, tweet);

silicon_dzor.use(require('helmet')());
silicon_dzor.use(express.static('public'));
silicon_dzor.use(favicon('public/favicon.ico'));
silicon_dzor.use(require('morgan')('combined'));

silicon_dzor.use(session({
  secret:
  env.debug ? 'keyboard cat' :
    (() => {
      if (!env.session_key)
	throw new Error('Running in prod and no SESSION_KEY!');
      return env.session_key;
    })(),
  resave: false,
  saveUninitialized: true
}));

const rendered = render(createElement(frontend, null));

// Not a XSS because we already did XSS by time data comes into DB.
const site = (tech_events, e_count) => `
<!doctype html>
<meta charset="utf-8">
<meta name="Armenian tech calendar"
      content="See all the tech events in Yerevan and all of Armenia in one place">
<head>
  <title>All the tech events in Armenia</title>
  <link rel="shortcut icon" href="favicon.ico" >
  <link rel="icon" type="image/gif" href="animated_favicon1.gif" >
  <link rel="preload" href="bundle.js" as="script">
  <link href="styles.css" rel="stylesheet" type="text/css">
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css">
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
    window.__EVENT_COUNT_THIS_MONTH__ = ${e_count}
  </script>
</head>
<body>
  <div id='container'>${rendered}</div>
  <script src='bundle.js'></script>
</body>
`;

silicon_dzor.get('/', async (req, res) => {
  try {
    const pulled =
	  // This way we eliminate duplicates, unlikely that
	  // descriptions for some events will naturally be redundant
	  // but quite likely that people copy paste titles from one
	  // event to another
	  await db_promises.all(`
select title, all_day, start, end, url, creator, description from event
group by description
`);

    res.setHeader('content-type', 'text/html');
    let transformed = pulled.map(item => {
      const start = new Date(item.start).getTime();
      const end = new Date(item.end).getTime();

      return {
        title:item.title,
        allDay: item.all_day ? true : false,
        start,
        end,
        desc: item.description,
	url:item.url,
	sourced_from:item.creator
      };
    });
    const {event_count} = await db_promises.get(`
select count(*) as event_count from 
(select title from event 
where (strftime('%m', datetime(end, 'unixepoch')) - 1) = 
(strftime('%m', 'now') + 0) group by title);
`);
    res.end(site(transformed, event_count));
  } catch (e) {
    console.error(e);
  }
});

silicon_dzor.post(Routes.new_account, json_pr, form_pr, async (req, res) => {
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
    res.end(replies.ok());
  } catch (err) {
    res.end(replies.fail(err.msg));
  }
});

silicon_dzor.post(Routes.sign_in, json_pr, form_pr, async (req, res) => {
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

silicon_dzor.get(Routes.new_account_verify, (req, res) => {
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

silicon_dzor.post(Routes.add_tech_event, json_pr, async (req, res) => {
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
      .listen(port, () =>
	      console.log(`Started debug server on ${port}, no HTTPS`));
  } else {
    //letsencrypt https
    const lex = leExpress.create({
      server: 'https://acme-v01.api.letsencrypt.org/directory',
      approveDomains: approveDomains,
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
      .listen(port, () =>
	      console.log("Listening for ACME http-01 challenges on", port));

    // handles silicon_dzor app
    require('https')
      .createServer(lex.httpsOptions, lex.middleware(silicon_dzor))
      .listen(port_https, () =>
	      console.log("Listening for ACME tls-sni-01 challenges and serve app on",
			  port_https));
  }
})();
