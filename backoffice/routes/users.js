const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { generateToken } = require("../models/jwtToken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserById
} = require("../models/userModel");
//const debug = require("debug")("purisima:api");

router.get("/me", auth, async (req, res) => {
  // The user information is not in the query parameters for security reasons
  // the auth middleware implementas a request.user object with the user's data
  const queryParam = req.user.id;
  const sql_query =
    "SELECT id, username, email, isAdmin FROM `users` WHERE `id`= ?";
  try {
    const queryResult = await getUserById(sql_query, queryParam);
    return res.status(200).send(queryResult);
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
  }
});

router.post("/new", [auth, admin], async (req, res) => {
  // Input Validation
  const { username, email, password, isAdmin } = req.body;
  
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).send("Username, email, and password are required");
  }
  
  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long");
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format");
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const queryParams = [username, email, hashed, isAdmin || false];
  const sql_query =
    "INSERT INTO `users`(username,email,password,isAdmin) VALUES(?,?,?,?);";
  try {
    const queryResult = await registerUser(sql_query, queryParams);
    // debug("inserted id", queryResult.insertId);
    const token = generateToken(queryResult.insertId, username, isAdmin);
    return res
      .status(201)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(queryResult);
  } catch (error) {
    return res.status(400).send(error.sqlMessage);
    // Duplicate entry "value" for key `column` --> if Error=ER_DUP_ENTRY status 400
  }
});

module.exports = router;
