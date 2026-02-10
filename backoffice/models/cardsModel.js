const Joi = require("joi");
const dbConn = require("../startup/db");
const debug = require("debug")("purisima:db");

function validateCardToSave(newCard) {
  const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string()
      .min(3)
      .max(256)
      .required(),
    description: Joi.string()
      .min(3)
      .max(2048)
      .required(),
    buttonText: Joi.string()
      .min(3)
      .max(256)
      .required(),
    landingPage: Joi.string()
      .min(3)
      .max(256)
      .required(),
    isVisible: Joi.boolean().required()
  });
  return Joi.validate(newCard, schema);
}

function getCards(sql_query) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, (err, results) => {
      if (err) {
        debug(err); // DB ERROR
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
}

function getCardById(sql_query, queryParams) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, [queryParams], (err, result) => {
      if (err) {
        debug(err); // DB ERROR
        reject(err);
      } else {
        result.length === 0
          ? resolve(null)
          : resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

function editCardById(sql_query, queryParams) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, queryParams, (err, result) => {
      if (err) {
        debug(err);
        reject(err);
      } else {
        result.affectedRows === 0
          ? resolve(null)
          : resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

function deleteCard(sql_query, queryParams) {
  return new Promise((resolve, reject) => {
    dbConn.query(sql_query, queryParams, (err, result) => {
      if (err) {
        debug(err);
        reject(err);
      } else {
        result.affectedRows === 0
          ? resolve(null)
          : resolve(JSON.parse(JSON.stringify(result)));
      }
    });
  });
}

function createNewCard(sql_query, queryParams) {
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

exports.deleteCard = deleteCard;
exports.editCardById = editCardById;
exports.createNewCard = createNewCard;
exports.getCards = getCards;
exports.validateCard = validateCardToSave;
exports.getCardById = getCardById;
