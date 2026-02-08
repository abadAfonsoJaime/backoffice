const dbConn = require("../startup/db");
const debug = require("debug")("backoffice:models:login");
// const Joi = require("joi");

function validateLoginInput(req) {
  // TODO: Implement validation solution
  // const schema = Joi.object({
  //   username: Joi.string().min(3).max(30).required(),
  //   password: Joi.string().min(6).required()
  // });
  // return schema.validate(req);
  
  // Temporary pass-through - no validation
  return { error: null, value: req };
}

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
exports.validateLoginInput = validateLoginInput;
