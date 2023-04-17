const { Op } = require("sequelize");
const db = require("../models");
const User = db.User;
const { validationResult } = require("express-validator");

exports.userList = async (req, res, next) => {
  let users = null;
  if (req.query.find == null) {
    users = await User.findAll();
  } else {
    users = await User.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${req.query.find}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${req.query.find}%`,
            },
          },
        ],
      },
    });
  }

  return res.status(200).json({
    msg: "User found successfully",
    data: users,
  });
};

exports.blockUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({
    where: {
      id: req.body.user,
    },
  });

  if (user) {
    user.blocked = req.body.status;
    user.save();
  } else {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  return res.status(200).json({
    msg: "User blocked status changed successfully",
  });
};
