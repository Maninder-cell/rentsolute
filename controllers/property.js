const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const Property = db.Property;
const PropertyImage = db.PropertyImage;
const Room = db.Room;
const Amenity = db.Amenity;
const PropertyAmenity = db.PropertyAmenity;
const PropertyQuestion = db.PropertyQuestion;
const Image = db.Image;

exports.addProperty = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user_property = { ...req.body, user_id: req.user.id };

  const property = await Property.create(user_property);

  //Property images creation
  let images = [];
  req.body.images.forEach((image) => {
    let obj = {
      image_id: image.image,
      property_id: property.id,
    };
    images.push(obj);
  });

  await PropertyImage.bulkCreate(images);

  //Property amenities creation
  let amenities = [];
  req.body.amenities.forEach((amenity) => {
    let obj = {
      amenity_id: amenity,
      property_id: property.id,
    };
    amenities.push(obj);
  });

  await PropertyAmenity.bulkCreate(amenities);

  //Property rooms creation
  let rooms = [];
  req.body.rooms.forEach((room) => {
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
  req.body.questions.forEach((question) => {
    let obj = {
      property_id: property.id,
      question_id: question.question_id
    }
    questions.push(obj);
  });

  await PropertyQuestion.bulkCreate(questions);

  //Get property with all associated relations
  const get_property = await Property.findOne({
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

  return res.status(200).json({
    msg: "Property created sucessfully",
    data: get_property,
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
