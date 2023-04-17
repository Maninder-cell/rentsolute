const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const User = db.User;

exports.verify = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findOne({where : {id : decoded.user.id }});

    if (user.blocked){
      return res.status(403).send("Access denied");
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
