'use strict';

const env = require('./env');
const sqlite3 = env.debug ? require('sqlite3').verbose() : require('sqlite3');

module.exports = db_path => {
  const db = new sqlite3.Database(db_path);

  return {
    get(query, params) {
      return new Promise((accept, reject) => {
	      db.get(query, params, (err, data) => {
	        if (err) reject(err);
	        else accept(data);
	      });
      });
    },
    run(query, params) {
      return new Promise((accept, reject) => {
	      db.run(query, params, err => {
	        if (err) reject(err);
	        else accept();
	      });
      });
    },
    all(query, params) {
      return new Promise((accept, reject) => {
	      db.all(query, params || {}, (err, d) => {
	        if (err) reject(err);
	        else accept(d);
	      });
      });
    }
  };
};
