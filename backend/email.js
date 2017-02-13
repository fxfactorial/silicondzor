'use strict';

const env = require('./env');
const nodemailer = require('nodemailer');
const email_message = require('../lib/email-form').default;

const email_account = 'iteratehackerspace@gmail.com';

exports.email_account = email_account;

const email_password = env.production ? env.email_password : null;

const email_verify_link = identifier =>
      env.production
      ? `http://localhost:9090/verify-account/${identifier}`
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
