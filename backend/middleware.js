const favicon = require('serve-favicon');
const session = require('express-session');
const env = require('./env');

module.exports = silicon_dzor => {
  silicon_dzor.use(require('helmet')());
  silicon_dzor.use(require('express').static('public'));
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
};
