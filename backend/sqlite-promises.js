'use strict';

module.exports = db => {
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
