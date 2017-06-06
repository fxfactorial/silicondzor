'use strict';

const body_parser = require('body-parser');
const xssFilters = require('xss-filters');
const crypto = require('crypto');

const translateAll = require('./yandex-translate');
const REST = require('../lib/http-routes').default;
const replies = require('../lib/replies').default;
const { email_verify_link, email_message, send_mail } = require('./email');
const bcrypt_promises = require('./bcrypt-promise');

const json_pr = body_parser.json();
const form_pr = body_parser.urlencoded({extended: true});
const uuid_v4 = require('uuid/v4');

module.exports = (silicon_dzor, db, register_email_users) => {

  silicon_dzor.post(REST.post.new_account, json_pr, form_pr, async (req, res) => {

    res.setHeader('content-type', 'application/json');

    let { email, username, password } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();

    const email_query =
          await db.get(`select email from account where email = $e`, {$e:email});

    const username_query =
          await db.get(`select display_name from account where display_name = $e`,
                       {$e:username});

    if (email_query) {
      res.end(replies.fail(replies.invalid_email_already_registered));
      return;
    } else if (username_query) {
      res.end(replies.fail(replies.invalid_username_already_picked));
      return;
    } else {
      const hash = await bcrypt_promises.hash(password, 10);
      await db.run(`
insert into account (display_name, email, hashed_password)
values ($d_name, $e, $h)`, {$d_name:username, $e: email, $h: hash});
    }
    const identifier = uuid_v4();
    register_email_users[identifier] = {username, identifier};
    const verify_link = email_verify_link(identifier);

    try {
      // const mail_opts = {
      //   from: 'Silicondzor.com <iteratehackerspace@gmail.com> ',
      //   to: username,
      //   subject: 'Verify account -- Silicondzor.com',
      //   text: email_message(username, verify_link, false),
      //   html: email_message(username, verify_link)
      // };
      // await send_mail(mail_opts);
      res.end(replies.ok());
    } catch (err) {
      res.end(replies.fail(err.msg));
    }

  });

  silicon_dzor.post(REST.post.sign_in, json_pr, form_pr, async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt_promises.hash(password, 10);
    try {
      const row = await db.get(`
select hashed_password from account where display_name = $e and is_verified = 1`,
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

  silicon_dzor.post(REST.post.submit_post, json_pr, form_pr, async (req, res) => {
    try {
      if (req.session.logged_in) {
        const b = req.body;
        const query_result =
	            await db.get(`
select * from account where email = $username and is_verified = 1`,
		                       {$username: req.session.username});
        const id =
	            crypto
	        .createHash('sha256')
	        .update(b.title + b.creation_time + query_result.id)
	        .digest('hex');
        await db.run(`
insert into post (creator, id, creation_time, title, content, web_link) values
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
  });

  silicon_dzor.post(REST.submit_job, json_pr, form_pr, async (req, res) => {
    try {
      if (req.session.logged_in) {
        const b = req.body;
        const query_result =
	        await db
	        .get(`select * from account where email = $username and is_verified = 1`,
		           {$username: req.session.username});
        const id =
	        crypto
	        .createHash('sha256')
	        .update(b.title + b.creation_time + query_result.id)
	        .digest('hex');
        await db.run(`
insert into post (creator, id, creation_time, title, content, web_link) values
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
  });

  silicon_dzor.post(REST.add_tech_event, json_pr, async (req, res) => {
    try {
      if (req.session.logged_in) {
        const b = req.body;
        let title = await translateAll(b.event_title);
        const query_result =
	        await db
	        .get(`select * from account where email = $username and is_verified = 1`,
		           {$username: req.session.username});
        const id =
	        crypto
	        .createHash('sha256')
	        .update(b.event_title + b.start + query_result.id)
	        .digest('hex');
        await db.run(`
insert into event values
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

  silicon_dzor.post(REST.comment, json_pr, async (req, res) => {
    try {
      if (req.session.logged_in) {
        const b = req.body;
        const query_result =
	        await db.get(`
select * from account where email = $username and is_verified = 1`,
		                   {$username: req.session.username});
        const id =
          // Not sure why this is being used at all, come back to this.
	        crypto
	        .createHash('sha256')
	        .update(b.post_id + query_result.id)
	        .digest('hex');
        await db.run(`
insert into comment
(creator, under_post_id, id, creation_time, content, parent_comment) values
($creator, $under_post_id, $id, $creation_time, $content)`, {
  $creator:query_result.id,
  $under_post_id: b.post_id,
  $id: id,
  $creation_time: (new Date()).getTime(),
  $content: xssFilters.inHTMLData(b.content),
  $parent_comment: b.parent_comment ? b.parent_comment : null
});
        res.end(replies.ok());
      } else {
        res.end(replies.fail(replies.invalid_session));
      }
    } catch (err) {
      res.end(replies.fail(err.msg));
    }
  });

  silicon_dzor.post(REST.get_comments, json_pr, form_pr, async (req, res) => {
    const comments =
          await db
          .all(`select * from comment where under_post_id = $post_id`,
               {$post_id: req.body.post_id});
    console.log({comments});
    res.end(JSON.stringify(comments));
  });

  silicon_dzor.post(REST.upvote, json_pr, async (req, res) => {
    try {
      if (req.session.logged_in) {
        const b = req.body;
        const query_result =
	        await db.get(`select upvotes from post where id = $id`,
		                   {$id: b.id});

        await db.run(`
UPDATE post
SET upvotes = $upvotes
WHERE id = $id;
()`, {$id: b.id, $upvotes: ++query_result.upvotes});
        res.end(replies.ok());
      } else {
        res.end(replies.fail(replies.invalid_session));
      }
    } catch (err) {
      res.end(replies.fail(err.msg));
    }
  });

};
