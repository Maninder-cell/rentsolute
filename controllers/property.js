const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { where, QueryTypes } = require("sequelize");
require("dotenv").config();
const db = require("../models");
const Property = db.Property;
const PropertyImage = db.PropertyImage;
const Room = db.Room;
const Amenity = db.Amenity;
const PropertyAmenity = db.PropertyAmenity;
const PropertyQuestion = db.PropertyQuestion;
const Image = db.Image;
const Geo = require("../helpers/geo");

const dbProperty = async (
  _images,
  _amenities,
  _rooms,
  _questions,
  property
) => {
  //Property images creation
  let images = [];
  _images.forEach((image) => {
    let obj = {
      image_id: image.image,
      property_id: property.id,
    };
    images.push(obj);
  });

  await PropertyImage.bulkCreate(images);

  //Property amenities creation
  let amenities = [];
  _amenities.forEach((amenity) => {
    let obj = {
      amenity_id: amenity,
      property_id: property.id,
    };
    amenities.push(obj);
  });

  await PropertyAmenity.bulkCreate(amenities);

  //Property rooms creation
  let rooms = [];
  _rooms.forEach((room) => {
    let obj = {
      property_id: property.id,
      name: room.name,
      image_id: room.image,
      room_type: room.type,
    };
    rooms.push(obj);
  });

  await Room.bulkCreate(rooms);

  //Property Question creation
  let questions = [];
  _questions.forEach((question) => {
    let obj = {
      property_id: property.id,
      question_id: question.question_id,
    };
    questions.push(obj);
  });

  await PropertyQuestion.bulkCreate(questions);

  //Get property with all associated relations
  const get_property = Property.findOne({
    where: { id: property.id },
    include: [
      {
        model: Image,
        attributes: ["id", "caption", "image"],
        through: {
          attributes: [],
        },
      },
      {
        model: Amenity,
        attributes: ["id", "name", "icon"],
        through: {
          attributes: [],
        },
      },
      {
        model: Room,
        attributes: ["id", "name", "room_type"],
      },
    ],
  });

  return get_property;
};

exports.addProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user_property = { ...req.body, user_id: req.user.id };

  const property = await Property.create(user_property);

  const get_property = await dbProperty(
    req.body.images,
    req.body.amenities,
    req.body.rooms,
    req.body.questions,
    property
  );

  return res.status(200).json({
    msg: "Property created sucessfully",
    data: get_property,
  });
};

exports.updateProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const property = await Property.findOne({
    where: { id: req.params.id, user_id: req.user.id },
  });

  property.update(req.body);

  const get_property = await dbProperty(
    req.body.images,
    req.body.amenities,
    req.body.rooms,
    req.body.questions,
    property
  );

  return res.status(200).json({
    msg: "Property updated sucessfully",
    data: get_property,
  });
};

exports.deleteProperty = async (req, res, next) => {
  const property = await Property.destroy({
    where: { id: req.params.id, user_id: req.user.id },
  });

  return res.status(200).json({
    msg: "We have deleted your property successfully",
  });
};

exports.saveImage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const image = await Image.create({
    caption: req.body.caption,
    image: "/uploads/" + req.file.filename,
    filename: req.file.filename,
    user_id: req.user.id,
  });

  return res.json({
    message: "Image saved sucessfully",
    image_id: image.id,
    image_url: image.image,
    image_caption: image.caption,
  });
};

exports.getNearProperties = async (req, res, next) => {
  const geo = new Geo(req.query.longitude,req.query.latitude);
  const results = await geo.findNearDistanceQuery('properties',req.query.distance);

  return res.json({
    results: results,
  });
};
