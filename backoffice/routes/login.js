const express = require("express");
const router = express.Router();
//const { validateLoginInput, checkUsername } = require("../models/loginModel");
const checkUsername = require("../models/loginModel");

const bcrypt = require("bcrypt");
const { generateToken } = require("../models/jwtToken");

router.post("/", async (req, res) => {
  // Should return an error message from its own module
  const { error } = validateLoginInput(req.body);
  if (error) {
    return res.status(400).send("Invalid username or password");
  } else {
    const { username, password } = req.body;
    const sql_query =
      "SELECT `id`, `username`, `password`, `isAdmin` FROM `users` WHERE username= ?;";
    try {
      let dbUser = await checkUsername(sql_query, username);
      const checkPassword = await bcrypt.compare(password, dbUser.password);
      console.log("try --> hash? ", checkPassword);
      if (checkPassword) {
        const token = generateToken(dbUser.id, dbUser.username, dbUser.isAdmin);
        return res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "x-auth-token")
          .send(true);
      } else {
        return res.status(400).send("Invalid username or password");
      }
    } catch (ex) {
      console.log("va por aquí");
      res.status(400).send("Invalid username or password");
    }
  }
});

module.exports = router;