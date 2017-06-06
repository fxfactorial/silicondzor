INSERT INTO account
    (display_name, email, is_verified, hashed_password)
    VALUES ('e_d_g_a_r', 'edgar.factorial@gmail.com', 1,
        --This is the hash of the string 'iterate'
        '$2a$10$iSyaaD7yFEffc7lkT7Igcu8qZk2HXwxsr/v6sYlzJ.oZ/pg6V0WLK');

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, 1490805999363, 1490805999369,
        'cool, we can hack everybody', 1,
        'https://www.facebook.com/groups/410797219090898/',
        15);

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, 1490805999363, 1490805999369,
        'cool, we can hack everybody', 1,
        'https://www.facebook.com/groups/410797219090898/', 16);

INSERT INTO event
    (title, all_day, start, end, description, creator, url, id)
    VALUES ('HACK EVERYBODY', 1, 1490805999363, 1490805999369,
        'cool, we can hack everybody', 1,
        'https://www.facebook.com/groups/410797219090898/',
        17);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 123, 1490805999363, 'hacking code and whatnot',
			'aaaa lloooooot oooooffff teeeexfda sfdsaasdfas dfasdfasdf asdft sdf sdf  sd sdfsdf  sdf',
			'https://www.facebook.com/groups/410797219090898/', 12, 2, 1);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 124, 1490805999363, 'hacking Other people',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://info.sec/home', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 125, 1490805991363, 'Some other title',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://info.sec/home', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 126, 1490805599363, 'More imports and pagination',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://info.sec/home', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 127, 1490805999363, 'Some very complicated topic',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://info.sec/home', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 128, 1490805997363, 'Will Vue survive the nuclear winter?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://rob.adamyan', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 129, 1490905999363, 'Who cares about gulp anymore?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 130, 1440805999363, 'Generic post',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 131, 1490805999363, 'ASK SD: How can I get better at Python?',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://otherpage.com/snakes', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (1, 132, 1490805999363, 'Webpack in Armenian',
			'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			'http://hyegar.com/hopeful-future', 15, 0, 5);

INSERT INTO post
    (creator, id, creation_time, title, content, web_link, upvotes, downvotes, comment_count)
    VALUES (2, 133, 1490805999363, 'hacking is super fun',
			'aaaa lloooooot oooooffff teeeext',
			'https://www.facebook.com/groups/410797219090898/', 1999, 3, 195);

INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 130, 1, 1490805999999,
			'aaaa lloooooot oooooffff teeeext', 199, 3);

INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 130, 2, 1490805999999,
			'aaaa dsadt', 129, 3);

INSERT INTO comment
    (creator, under_post_id, id, creation_time, content, upvotes, downvotes)
    VALUES (2, 130, 3, 1490805999999,
			'aaaa lloooooffff teeeext', 9, 3);

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (2, 1, 1490805999363, 'hacking is super fun',
			'aaaa lloooooot oooooffff teeeext',
			'https://www.facebook.com/groups/410797219090898/');

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 2, 1490805999363, 'hacking',
			  'aaaa lloooooot oooooffff teeeexfda sfdsaasdfas dfasdfasdf asdft sdf sdf  sd sdfsdf  sdf',
        'https://www.facebook.com/groups/410797219090898/');

INSERT INTO job_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 3, 1490805999363,
        'hacking is super fun',
			  'aaaa llooosdfasdfasdfasdooot oooasdfooffff tsdafeeeext',
			  'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 1, 1490805999363,
        'hacking me and get money', 'money for bug',
			  'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 2, 490805999363, 'pentest this server',
			  'i give you 100000000000$ for that',
			  'https://www.facebook.com/groups/410797219090898/');

INSERT INTO bug_post
    (creator, id, creation_time, title, content, web_link)
    VALUES (1, 3, 1490805999363,
        'hacking is super fun', 'just hack smb for fun and get 0.00000001$',
			  'https://www.facebook.com/groups/410797219090898/');
