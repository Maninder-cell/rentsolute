const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const Property = db.Property;

exports.addProperty = async(req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('ammd');
}