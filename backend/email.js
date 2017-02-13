'use strict';

const env = require('./env');
const nodemailer = require('nodemailer');

const email_account = 'iteratehackerspace@gmail.com';
const email_password = env.production ? env.email_password : null;

const email_transporter =
      email_password !== null
      ? nodemailer
      .createTransport(`smtps://${email_account}:${email_password}@smtp.gmail.com`)
      : null;

exports.email_account = email_account;
exports.email_message = require('../lib/email-form').default;
exports.email_verify_link = identifier =>
  env.production
  ? `http://localhost:9090/verify-account/${identifier}`
  : `https://silicondzor.com/verify-account/${identifier}`;
exports.send_mail = mail_opts => {
  return new Promise((accept, reject) => {
    email_transporter.sendMail(mail_opts, (err, other) => {
      if (err) reject(err);
      else accept();
    });
  });
};
