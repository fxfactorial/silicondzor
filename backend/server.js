'use strict';

const express = require('express');
const createElement = require('react').createElement;
const render = require('react-dom/server').renderToString;
const frontend = require('../lib/silicondzor').default;
const email_message = require('../lib/email-form').default;
const replies = require('../lib/replies').default;
const uuid_v4 = require('uuid/v4');
const body_parser = require('body-parser');
const session = require('express-session');
const silicon_dzor = express();
const sqlite3 =
      process.env.NODE_ENV === 'debug'
      ? require('sqlite3').verbose() : require('sqlite3');
const bcrypt_promises = require('./bcrypt-promise');
const json_pr = body_parser.json();
const form_pr = body_parser.urlencoded({extended: true});
const nodemailer = require('nodemailer');

const email_account = 'iteratehackerspace@gmail.com';
const email_password =
      process.env.NODE_ENV === 'debug'
      ? process.env.ITERATE_EMAIL_PASSWORD : null;

const email_verify_link = identifier =>
      process.env.NODE_ENV === 'debug'
      ? `http://localhost:8080/verify-account/${identifier}`
      : `https://silicondzor.com/verify-account/${identifier}`;

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

const port = process.env.NODE_ENV === 'debug' ? 8080 : 80;
// Assumes that such a database exists, make sure it does.
const db = new sqlite3.Database('silicondzor.db');
const Routes = require('../lib/routes').default;

const db_promises = require('./sqlite-promises')(db);

let register_email_users = {};
// Drop everyone left every 1 hour, aka link is only good for 1 hour
setTimeout(() => register_email_users = {}, 60 * 1000 * 60);

silicon_dzor.use(require('helmet')());
silicon_dzor.use(express.static('public'));
silicon_dzor.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

if (process.env.NODE_ENV === 'debug') {
  setImmediate(() => {
    db
      .run(`
insert into account 
(email, hashed_password, is_verified) 
values ($email, $hashed, $is_verified)`, {
  $email: 'edgar.factorial@gmail.com',
  $hashed: bcrypt_promises.hashSync('hello', 10),
  $is_verified: 0})
      .run(`
insert into event values ($title, $all_day, $start, $end, $description, 0)`, {
  $title: 'Hour of Code Yerevan mentor meetup',
  $all_day: true,
  $start: (new Date(2016, 11, 18)).getTime(),
  $end: (new Date(2016, 11, 19)).getTime(),
  $description: 'Mentor kids with code!'
});
  });
}

const rendered = render(createElement(frontend, null));

const site = tech_events => `
<!doctype html>
<meta charset="utf-8">
<head>
  <link rel="shortcut icon" type="image/x-icon" href="public/favicon.ico">
  <link href="styles.css" rel="stylesheet" type="text/css">
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css">
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
  </script>
</head>
<body>
  <div id='container'>${rendered}</div>
  <script src='bundle.js'></script>
</body>
`;

silicon_dzor.get('/', async (req, res) => {
  req.session.logged_in = true;
  req.session.username = 'edgar.factorial@gmail.com';

  try {
    const pulled = await db_promises.all(`select * from event`);
    res.setHeader('content-type', 'text/html');
    let transformed = pulled.map(item => {
      return {
	title:item.title,
	allDay: item.all_day ? true : false,
	start: (new Date(item.start)).getTime(),
	end: (new Date(item.end)).getTime(),
	desc: item.description
      };
    });
    res.end(site(transformed));
  } catch (e) {
    console.error(e);
  }
});

silicon_dzor.post(Routes.new_account, json_pr, form_pr, async (req, res) => {
  const {username, password} = req.body;

  // db_promises
  //   .get(`select email from account where email = $email`,
  // 	 {$email:username})
  //   .then(d => {
      
  //   });
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
	  .get('select hashed_password from account where email = $e',
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
      const query_result =
	    await db_promises
	    .get(`select * from account where email = $username and is_verified = 1`,
		 {$username: req.session.username});
      console.log(query_result);
      await db_promises.run(`insert into event values 
($title, $all_day, $start, $end, $description, $creator)`, {
  $title: b.event_title,
  $all_day: false,
  $start:(new Date(b.start)).getTime(),
  $end:(new Date(b.end)).getTime(),
  $description: b.event_description,
  $creator:query_result.id
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

silicon_dzor.listen(port, () => console.log(`Started on ${port}`));
