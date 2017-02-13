'use strict';
/* jshint esversion: 6 */
const env = require('./env');
const express = require('express');
const leExpress = require('letsencrypt-express');
const createElement = require('react').createElement;
const render = require('react-dom/server').renderToString;
const frontend = require('../lib/silicondzor').default;
const replies = require('../lib/replies').default;
const uuid_v4 = require('uuid/v4');
const body_parser = require('body-parser');
const silicon_dzor = express();
const sqlite3 = env.debug ? require('sqlite3').verbose() : require('sqlite3');
const crypto = require('crypto');
const bcrypt_promises = require('./bcrypt-promise');
const json_pr = body_parser.json();
const form_pr = body_parser.urlencoded({extended: true});
const tweet = require('./tweet-events');
const xssFilters = require('xss-filters');
const {events_every} = require('./fb-events');
const translateAll = require('./yandex-translate');
const ui = require('../lib/http-routes').default.ui_routes;
const html_replies = require('../lib/html-documents');
const {email_account} = require('./email');
const {event_count, events} = require('./data');

// What is the RouterContext for?
const {match, RouterContext} = require('react-router');

const port = env.debug ? 9090 : 80;
const port_https = env.debug ? 8443 : 443;
// Assumes that such a database exists, make sure it does.
const db = new sqlite3.Database('silicondzor.db');
const routes = require('../lib/routes').default;
const db_promises = require('./sqlite-promises')(db);

let register_email_users = {};

// daemons
// Drop everyone left every 24 hour, aka link is only good for 24 hour
setInterval(() => register_email_users = {}, 60 * 1000 * 60 * 24);
// Kick off the twitter bot
require('./tweet-bot-service')(db_promises);
// Getting the tech events every 24 Hours
events_every(60 * 1000 * 60 * 24, db_promises, tweet);
// Add helmet, serve static in public, favicon, morgan, sessions
require('./middleware')(silicon_dzor);

// Handle the UI requests
silicon_dzor.use((req, res, next) => {
  match({routes, location:req.url},
	async (err, redirect, props) => {
	  if (props) {
	    res.setHeader('Content-Type', 'text/html');
	    // Need to pull down all the latest stories?
	    const html = render(createElement(RouterContext, props));
	    let send_off = null;
	    const e_count = await event_count(db_promises);
	    const all_events = await events(db_promises);
	    switch (req.url) {
	    case ui.home.resource:
	      send_off = html_replies.homepage(html, all_events, e_count);
	      break;
	    case ui.about.resource:
	      send_off = html_replies.about(html, all_events, e_count);
	      break;
	    case ui.tech_calendar.resource:
	      send_off = html_replies.calendar(html, all_events, e_count);
	      break;
	    case ui.login.resource:
	      send_off = html_replies.login(html, all_events, e_count);
	      break;
	    default:
	      console.log(req.url);
	      throw new Error('Unknown UI Route requested');
	    }
	    res.status(200).end(send_off);
	  } else {
	    next();
	  }
	});
});

// silicon_dzor.get('/', async (req, res) => {
//   try {
//     const pulled =
	  // This way we eliminate duplicates, unlikely that
	  // descriptions for some events will naturally be redundant
	  // but quite likely that people copy paste titles from one
	  // event to another
// 	  await db_promises.all(`
// select title, all_day, start, end, url, creator, description from event
// group by description
// `);

//     res.setHeader('content-type', 'text/html');
//     let transformed = pulled.map(item => {
//       const start = new Date(item.start).getTime();
//       const end = new Date(item.end).getTime();

//       return {
//         title:item.title,
//         allDay: item.all_day ? true : false,
//         start,
//         end,
//         desc: item.description,
// 	url:item.url,
// 	sourced_from:item.creator
//       };
//     });
//     const {event_count} = await db_promises.get(`
// select count(*) as event_count from
// (select title from event
// where (strftime('%m', datetime(end, 'unixepoch')) - 1) =
// (strftime('%m', 'now') + 0) group by title);
// `);
//     res.end(site(transformed, event_count));
//   } catch (e) {
//     console.error(e);
//   }
// });

// silicon_dzor.post(Routes.new_account, json_pr, form_pr, async (req, res) => {
//   const {username, password} = req.body;

//   const email_query =
// 	await db_promises
// 	.get(`select email from account where email = $email`,
//   	     {$email:username});

//   if (email_query) {
//     res.end(replies.fail(replies.invalid_username_already_picked));
//     return;
//   }

//   const identifier = uuid_v4();
//   register_email_users[identifier] = {username, identifier};
//   const verify_link = email_verify_link(identifier);

//   const hash = await bcrypt_promises.hash(password, 10);
//   try {
//     await db_promises
//       .run(`insert into account (email, hashed_password) values ($e, $h)`,
// 	   { $e: username, $h: hash});
//     const mail_opts = {
//       from: 'Silicondzor.com <iteratehackerspace@gmail.com> ',
//       to: username,
//       subject: 'Verify account -- Silicondzor.com',
//       text: email_message(username, verify_link, false),
//       html: email_message(username, verify_link)
//     };
//     await send_mail(mail_opts);
//     res.end(replies.ok());
//   } catch (err) {
//     res.end(replies.fail(err.msg));
//   }
// });

// silicon_dzor.post(Routes.sign_in, json_pr, form_pr, async (req, res) => {
//   const {username, password} = req.body;
//   req.session.logged_in = false;
//   try {
//     const row =
// 	  await db_promises
// 	  .get(`
// select hashed_password from account where email = $e and is_verified = 1`,
// 	       {$e:username});
//     try {
//       await bcrypt_promises.compare(password, row.hashed_password);
//       req.session.logged_in = true;
//       req.session.username = username;
//       res.end(replies.ok());
//     }
//     catch (err) {
//       res.end(replies.fail(replies.invalid_credentials));
//     }
//   } catch (err) {
//     res.end(replies.fail(replies.invalid_email));
//   }
// });

// silicon_dzor.get(Routes.new_account_verify, (req, res) => {
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

// silicon_dzor.post(Routes.add_tech_event, json_pr, async (req, res) => {
//   try {
//     if (req.session.logged_in) {
//       const b = req.body;
//       let title = await translateAll(b.event_title);
//       const query_result =
// 	    await db_promises
// 	    .get(`select * from account where email = $username and is_verified = 1`,
// 		 {$username: req.session.username});
//       const id =
// 	    crypto
// 	    .createHash('sha256')
// 	    .update(b.event_title + b.start + query_result.id)
// 	    .digest('hex');
//       await db_promises.run(`insert into event values
// ($title, $all_day, $start, $end, $description, $creator, $url, $id)`, {
//   $title: xssFilters.inHTMLData(title),
//   $all_day: new Date(b.start) === new Date(b.end),
//   $start:(new Date(b.start)).getTime(),
//   $end:(new Date(b.end)).getTime(),
//   $description: xssFilters.inHTMLData(b.event_description),
//   $creator:query_result.id,
//   $url: `https://silicondzor.com/${id}`, // TODO: use the url for linking
//   $id: id
// });
//       res.end(replies.ok());
//     } else {
//       res.end(replies.fail(replies.invalid_session));
//     }
//   } catch (err) {
//     res.end(replies.fail(err.msg));
//   }
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
      .listen(port, () =>
	      console.log(`Started debug server on ${port}, no HTTPS`));
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
