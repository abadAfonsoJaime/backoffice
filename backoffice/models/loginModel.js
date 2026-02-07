const dbConn = require("../startup/db");
const debug = require("debug")("purisima:db");

function checkUsername(sql_query, queryParam) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, queryParam, (err, result) => {
      if (err) {
        debug(err); // DB ERROR
        reject(err);
      } else {
        if (result.length === 0) {
          reject(result);
        } else {
          const fields = JSON.parse(JSON.stringify(result));
          debug("Fields --> ", fields[0]);
          resolve(fields[0]);
        }
      }
    });
  });
}

exports.checkUsername = checkUsername;
