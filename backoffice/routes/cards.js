const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const {
  validateCard,
  getCards,

  getCardById,
  createNewCard,
  editCardById,
  deleteCard
} = require("../models/cardsModel");
const debug = require("debug")("purisima:api");
//$env:DEBUG ="purisima:api, purisima:db"; nodemon index.js

// router.get('/', async (req, res) => {
//     const sql_query = "SELECT * FROM cards";
//     await dbConn.query(sql_query, (err, results) => {
//         return err ? res.send(err) : res.json({ data: results });
//     });
// });

router.get("/", auth, async (req, res) => {
  const query = "SELECT * FROM `cards`";
  try {
    const queryResult = await getCards(query);
    return res.status(200).send(queryResult);
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

router.get("/visible", async (req, res) => {
  const query = "SELECT * FROM `cards` WHERE `isVisible`=1";
  try {
    const queryResult = await getCards(query);
    return res.status(200).send(queryResult);
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

router.get("/:id", auth, async (req, res) => {
  const queryParam = req.params.id;
  const sql_query = "SELECT * FROM `cards` WHERE `id`= ?";
  try {
    const queryResult = await getCardById(sql_query, queryParam);
    return queryResult
      ? res.status(200).send(queryResult)
      : res.status(404).send("Not Found!");
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

// router.get('/new', async (req, res) => {
//     const { title, description, buttonText, landingPage, isVisible } = req.body;
//     const INSERT_CARD_QUERY = `INSERT INTO
//     cards(title, description, buttonText, landingPage, isVisible)
//     VALUES(
//         "${title}",
//         "${description}",
//         "${buttonText}",
//         "${landingPage}",
//         ${isVisible}
//     );`;
//     await dbConn.query(INSERT_CARD_QUERY, (err, results) => {
//         return err ? res.send(err) : res.send(results);
//     });
// });

router.post("/new", [auth, admin], async (req, res) => {
  // Input Validation
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    const { title, description, buttonText, landingPage, isVisible } = req.body;
    const queryParams = [
      title,
      description,
      buttonText,
      landingPage,
      isVisible
    ];
    const sql_query =
      "INSERT INTO `cards`(title,description,buttonText,landingPage,isVisible) VALUES(?,?,?,?,?);";
    try {
      const queryResult = await createNewCard(sql_query, queryParams);
      return res.status(201).send(queryResult);
    } catch (error) {
      return res.status(400).send(error.sqlMessage);
    }
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  // Input validation
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const id = req.params.id;
  const { title, description, buttonText, landingPage, isVisible } = req.body;
  const queryParams = [
    title,
    description,
    buttonText,
    landingPage,
    isVisible,
    id
  ];
  const sql_query =
    "UPDATE `cards` SET `title`=?,`description`=?,`buttonText`=?,`landingPage`=?,`isVisible`=? WHERE `id`=?";
  try {
    const queryResult = await editCardById(sql_query, queryParams);
    return queryResult
      ? res.status(202).send(queryResult)
      : res.status(404).send("Not Found!");
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const sql_query = "DELETE FROM `cards` WHERE id=? LIMIT 1";
  const queryParam = req.params.id;
  try {
    const queryResult = await deleteCard(sql_query, queryParam);
    return queryResult
      ? res.status(204).send(queryResult)
      : res.status(404).send("Not Found!");
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

module.exports = router;
