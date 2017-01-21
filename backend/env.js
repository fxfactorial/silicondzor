'use strict';

// Single place to contain all credentials
module.exports = Object.freeze({
  debug: process.env.NODE_ENV === 'debug' ? true : false,
  production: process.env.NODE_ENV === 'production' ? true : false,
  email_password : process.env.ITERATE_EMAIL_PASSWORD,
  session_key : process.env.SD_SESSION_KEY,
  fb : {
    client_id:process.env.ITERATE_FB_APP_ID,
    client_secret:process.env.ITERATE_FB_APP_SECRET
  },
  yandex : {
    api_key:process.env.ITERATE_YANDEX_TRANSLATOR_API
  },
  // This is in the direct format needed for the Twitter constructor
  twitter : {
    consumer_key:process.env.ITERATE_TWITTER_CONSUMER_KEY,
    consumer_secret:process.env.ITERATE_TWITTER_CONSUMER_SECRET,
    access_token_key:process.env.ITERATE_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret:process.env.ITERATE_TWITTER_ACCESS_TOKEN_SECRET
  }
});
