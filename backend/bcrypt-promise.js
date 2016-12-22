const bcrypt = require('bcrypt');

module.exports = {
  hash(plaintext, salt_round) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, salt_round, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  },
  compare(plaintext, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, hash, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  hashSync:bcrypt.hashSync
};
