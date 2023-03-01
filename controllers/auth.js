const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const db = require("../models");
const User = db.User;

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const check_user = await User.findOne({ where: { email: req.body.email } });

  if (check_user) {
    return res.json({ errors: { error: "Email is already registered" } });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    account_type: req.body.account_type,
  });

  const token = jwt.sign({ user }, process.env.SECRET_CODE, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  return res.json({
    success: 200,
    msg: "Register sucessfully",
    token: token,
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
    const authenticate = await bcrypt.compare(req.body.password, user.password);

    if (authenticate) {
      const token = jwt.sign({ user }, process.env.SECRET_CODE, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      return res.json({
        token: token,
        success: 200,
        msg: "Login sucessfully",
        data: user,
      });
    } else {
      return res
        .status(400)
        .json({ errors: { error: "Authentication failed" } });
    }
  }
};

exports.forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res
      .status(400)
      .json({ errors: { error: "Email is not registered" } });
  } else {
    const token = jwt.sign({ user }, process.env.SECRET_CODE, {
      expiresIn: 60 * 60 * 24,
    });

    const mailer = nodemailer.createTransport({
      port: 1025,
    });

    await mailer.sendMail({
      from: "no-reply@rentsolute.com",
      to: user.email,
      subject: "Hello",
      html: `
      <h3>Click the link below to change your password</h3>
      ${req.protocol}://${req.headers.host}/${token}
      `,
    });

    return res.json({
      success: 200,
      msg: "We have sent instructions to reset password over your registered email address.",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (req.body.new_password == req.body.confirm_password) {
    try {
      var decoded = jwt.verify(req.body.token_link, process.env.SECRET_CODE);
      if (decoded) {
        const user = await User.findOne({ where: { id: decoded.user.id } });
        if (user) {
          const hashPassword = await bcrypt.hash(req.body.new_password, 12);
          user.password = hashPassword;
          user.save();
          return res.json({
            success: 200,
            msg: "Password updated sucessfully",
          });
        } else {
          return res
            .status(400)
            .json({ errors: { error: "User not found" } });
        }
      }
    } catch (err) {
      return res
        .status(400)
        .json({ errors: { error: "Something went wrong!" } });
    }
  } else {
    return res
      .status(400)
      .json({ errors: { error: "Password should be match" } });
  }
};
