'use strict';

const express = require('express');
const createElement = require('react').createElement;
const renderToString  = require('react-dom/server').renderToString;
const frontend = require('../lib/silicondzor').default;
const body_parser = require('body-parser');
const session = require('express-session');
const silicon_dzor = express();
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({extended: true});
const port = process.env.NODE_ENV === 'DEBUG' ? 8080 : 80;

silicon_dzor.use(require('helmet')());
silicon_dzor.use(express.static('public'));
silicon_dzor.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// This needs to come from a database
const tech_events = [];

const rendered = renderToString(createElement(frontend, null));
const font =
      'https://fonts.googleapis.com/css?family=Poppins';

// Could also add all the chat messages, turn this into a function call,
// which is what will probably happen anyway.
const site =`
<!doctype html>
<meta charset="utf-8">
<head>
  <link href="${font}" rel="stylesheet">
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
  res.end(site);
});

silicon_dzor.post('/login', json_parser, form_parser, (req, res) => {
  const {username, password} = req.body;
  console.log(username);
  res.end(JSON.stringify({result:'success'}));
});

silicon_dzor.post('/add-tech-event', json_parser, (req, res) => {
  res.end(JSON.stringify({result:'success'}));
});

silicon_dzor.listen(port, () => console.log(`Started on ${port}`));
