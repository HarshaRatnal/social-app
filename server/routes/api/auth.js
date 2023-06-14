const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

function createAccessToken(userId) {
  return jwt.sign({
      userId: userId
  }, process.env.JWT_SECRET, {
      expiresIn: '10m'
  });
}

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(-"password");
    return res.json(user);
  } catch (err) {
    return res.status(500).send("server errpor");
  }
});

router.post(
  "/",
  [
    check("email", "enter the valid email").isEmail(),
    check("password", "enter proper password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check user already exits or not
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid user not found" }] });
      }
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
