const Joi = require("joi");
const dbConn = require("../startup/db");
const debug = require("debug")("backoffice:models:user");


function registerUser(sql_query, queryParams) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, queryParams, (err, result) => {
      if (err) {
        debug(err);
        reject(err);
      } else {
        debug(JSON.parse(JSON.stringify(result)));
        resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

function getUserById(sql_query, queryParams) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, queryParams, (err, result) => {
      if (err) {
        debug(err);
        reject(err);
      } else {
        debug(JSON.parse(JSON.stringify(result)));
        resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

exports.registerUser = registerUser;
exports.getUserById = getUserById;
