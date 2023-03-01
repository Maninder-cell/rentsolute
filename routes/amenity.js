const express = require("express");
const amenityController = require("../controllers/amenity");
const { body } = require("express-validator");
const upload = require("../utility/multer");

const router = express.Router();

router.post(
  "/new_amenities",
  upload.single("icon"),
  body("icon")
    .custom((value, { req }) => {
      if (req.file.mimetype === "image/png") {
        return ".png";
      } else {
        return false;
      }
    })
    .withMessage("Please only submit png image."),
  body("name").isString(),
  amenityController.addAmenity
);

router.get("/get_amenities", amenityController.getAmenities);

module.exports = router;
