--Needed to turn on foreign key constraints, not on by default because
--of sqlite backward compatibility
PRAGMA foreign_keys = ON;

CREATE TABLE account (
    id INTEGER PRIMARY KEY autoincrement,

    username TEXT NOT NULL,
    email TEXT NOT NULL,
    -- Holds a bcrypted hash
    hashed_password TEXT NOT NULL,
    is_verified INTEGER NOT NULL default 0
);

CREATE TABLE event (
    title TEXT NOT NULL,
    all_day INT NOT NULL,
    start INTEGER NOT NULL,
    end INTEGER NOT NULL,
    description TEXT NOT NULL,
    creator INTEGER NOT NULL,
    url TEXT NOT NULL,
    id TEXT NOT NULL,
    FOREIGN KEY (creator) REFERENCES account(ID),
    UNIQUE (id)
);

CREATE TABLE post (
   creator INTEGER NOT NULL,
   id TEXT NOT NULL,
   creation_time INTEGER NOT NULL,
   title TEXT NOT NULL,
   content TEXT,
   web_link TEXT,
   upvotes INTEGER NOT NULL DEFAULT 1,
   downvotes INTEGER NOT NULL DEFAULT 0,
   comment_count INTEGER NOT NULL DEFAULT 0,

   FOREIGN KEY (creator) REFERENCES account(ID)
);

CREATE TABLE job_post (
   creator INTEGER NOT NULL,
   id TEXT NOT NULL,
   creation_time INTEGER NOT NULL,
   title TEXT NOT NULL,
   content TEXT,
   web_link TEXT,

   FOREIGN KEY (creator) REFERENCES account(ID)

);

CREATE TABLE bug_post (
   creator INTEGER NOT NULL,
   id TEXT NOT NULL,
   creation_time INTEGER NOT NULL,
   title TEXT NOT NULL,
   content TEXT,
   web_link TEXT,

   FOREIGN KEY (creator) REFERENCES account(ID)

);

CREATE TABLE comment (
   creator INTEGER NOT NULL,

   --Make sure this goes through XSS Filter first before entering the
   --DB
   under_post_id TEXT NOT NULL,
   id TEXT NOT NULL,
   creation_time INTEGER NOT NULL,
   content TEXT NOT NULL,
   parent_comment TEXT,
   upvotes INTEGER NOT NULL DEFAULT 0,
   downvotes INTEGER NOT NULL DEFAULT 0,

   FOREIGN KEY (under_post_id) REFERENCES post(id),
   FOREIGN KEY (parent_comment)  REFERENCES comment(id),
   FOREIGN KEY (creator) REFERENCES account(id)
);
