INSERT INTO account
    (username, email, is_verified, hashed_password)
    VALUES ('edgar', 'iteratehackerspace@gmail.com', 1, '$2a$10$H9AlY/z6iH2INfTY6ZFTBe.4XdwHp39z3B7nY8avQQbvZjlOkxfGy');
 -- plaintext of hash_pass is 'iterate'
INSERT INTO account
		(username, email, is_verified, hashed_password)
		VALUES ('somebody', 'iterate@gmail.com', 1, '$2a$10$H9AlY/z6iH2INfTY6ZFTBe.4XdwHp39z3B7nY8avQQbvZjlOkxfGy');

INSERT INTO account
   (username, email, is_verified, hashed_password)
   VALUES ('anybody', 'iterate@gmail.com', 1, '$2a$10$H9AlY/z6iH2INfTY6ZFTBe.4XdwHp39z3B7nY8avQQbvZjlOkxfGy');

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, '1490805999363', '1490805999363', 'cool, we can hack everybody',
			1, 'https://www.facebook.com/groups/410797219090898/', 'someSupfdsafasdfdsferCoolID');

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, '1490805999363', '1490805999363', 'cool, we can hack everybody',
			1, 'https://www.facebook.com/groups/410797219090898/', 'someSuperCoolID');

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, '1490805999363', '1490805999363', 'cool, we can hack everybody',
			1, 'https://www.facebook.com/groups/410797219090898/', 'someSuperCosadasdolID');

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sadCoolId', '1490805999363', 'hacking code and whatnot',
			'aaaa lloooooot oooooffff teeeexfda sfdsaasdfas dfasdfasdf asdft sdf sdf  sd sdfsdf  sdf',
			'https://www.facebook.com/groups/410797219090898/', 12, 2, 1);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'hacking Other people',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://info.sec/home', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'Will Vue survive the nuclear winter?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://rob.adamyan', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'Who cares about gulp anymore?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'Generic post',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'ASK SD: How can I get better at Python?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com/snakes', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 'sasdddCoolId', '1490805999363', 'Webpack in Armenian',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://hyegar.com/hopeful-future', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (2, 'sadCoasdasolId', '1490805999363', 'hacking is super fun',
			'aaaa lloooooot oooooffff teeeext',
			'https://www.facebook.com/groups/410797219090898/', 1999, 3, 195);

INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 'sadCoolId', 'qweqweqweqweqID', '1490805999999',
			'aaaa lloooooot oooooffff teeeext', 199, 3);
INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 'sadCoolId', 'qweqweqweqweqID', '1490805999999',
			'aaaa dsadt', 129, 3);
INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 'sadCoolId', 'qweqweqweqweqID', '1490805999999',
			'aaaa lloooooffff teeeext', 9, 3);

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (2, 'sadCoafasdfasdfasdfsdasolId', '1490805999363', 'hacking is super fun',
			'aaaa lloooooot oooooffff teeeext',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 'sadCoasdfasdfasdfafdolId', '1490805999363', 'hacking',
			'aaaa lloooooot oooooffff teeeexfda sfdsaasdfas dfasdfasdf asdft sdf sdf  sd sdfsdf  sdf',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 'sasdddCgafgsfdgsdfhsfgasdfasdfsdaoolId', '1490805999363', 'hacking is super fun',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 'sasdgsdafasdfasdfasdljkjklfddCoolId', '1490805999363', 'hacking me and get money',
			'money for bug',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 'sasdddasdfasdfasdkjhlkjlhlgafdgdfghfgdhCoolId', '1490805999363', 'pentest this server',
			'i give you 100000000000$ for that',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 'sasdddCfghjjkghfghjkhjkkjkhjoolId', '1490805999363', 'hacking is super fun',
			'just hack smb for fun and get 0.00000001$',
			'https://www.facebook.com/groups/410797219090898/');
