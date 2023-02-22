const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const User = db.User;

exports.register = async(req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const check_user = await User.findOne({ where: { email: req.body.email } });

  if (check_user){
    return res.json({ errors: { error: "Email is already registered" } });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    account_type: req.body.account_type,
  })

  return res.json({
    success: "",
    msg: "",
    data: user,
  });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).json({ errors: { error: "User not found" } });
  } else {
    const token = jwt.sign({ user }, process.env.SECRET_CODE);
    return res.json({
      token: token,
      success: "",
      msg: "",
      data: user,
    });
  }
};
