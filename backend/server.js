'use strict';

const express = require('express');
const createElement = require('react').createElement;
const render = require('react-dom/server').renderToString;
const frontend = require('../lib/silicondzor').default;
const uuid_v4 = require('uuid/v4');
const body_parser = require('body-parser');
const session = require('express-session');
const silicon_dzor = express();
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({extended: true});
const port = process.env.NODE_ENV === 'DEBUG' ? 8080 : 80;
// Assumes that such a database exists, make sure it does.
const db = new sqlite3.Database('silicondzor.db');

silicon_dzor.use(require('helmet')());
silicon_dzor.use(express.static('public'));
silicon_dzor.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

if (process.env.NODE_ENV === 'DEBUG') {
  setImmediate(() => {
    db
      .run(`
insert into account 
(email, hashed_password, is_verified) 
values ($email, $hashed, $is_verified)`, {
  $email: 'edgar.factorial@gmail.com',
  $hashed: bcrypt.hashSync('hello', 10),
  $is_verified: 1})
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

silicon_dzor.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  db.all('select * from event', (_, d) => {
    const transformed = d.map(item => {
      return {
	title:item.title,
	allDay: item.all_day ? true : false,
	start: new Date(item.start),
	end: new Date(item.end),
	desc: item.description
      };
    });
    console.log(transformed);
    res.end(site(transformed));
  });
});

silicon_dzor.post('/new-account', json_parser, form_parser, (req, res) => {
  const {username, password} = req.body;
  console.log(username);
  res.end(JSON.stringify({result:'success'}));
});

silicon_dzor.post('/sign-in', json_parser, form_parser, (req, res) => {
  const {username, password} = req.body;
  console.log(username);
  res.end(JSON.stringify({result:'success'}));
});

silicon_dzor.post('/add-tech-event', json_parser, (req, res) => {
  res.end(JSON.stringify({result:'success'}));
});

silicon_dzor.listen(port, () => console.log(`Started on ${port}`));
