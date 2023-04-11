const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const Amenity = db.Amenity;

exports.addAmenity = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const amenity = await Amenity.create({
    icon: "/uploads/" + req.file.filename,
    name: req.body.name,
  });

  return res.json({
    statusCode: 200,
    message: "Amenity created sucessfully",
    data: amenity,
  });
};

exports.getAmenities = async (req, res, next) => {
  const amentities = await Amenity.findAll();

  return res.json({
    statusCode: 200,
    message: "Amentities found sucessfully",
    data: amentities,
  });
};
