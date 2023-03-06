const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const Property = db.Property;
const Image = db.Image;

exports.addProperty = async(req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const property = await Property.create(req.body);

    return res.status(200).json({
        "msg": "Property created sucessfully",
        "data": property
    })
}

exports.saveImage = async(req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const image = await Image.create({
        caption: req.body.caption,
        image:'/uploads/'+req.file.filename,
        filename: req.file.filename,
        user_id: req.user.id
    })

    return res.json({
        message: "Image saved sucessfully",
        image_id: image.id,
        image_url: image.image,
        image_caption: image.caption,
    });
}