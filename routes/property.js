const express = require("express");
const propertyController = require("../controllers/property");
const { body } = require("express-validator");
const upload = require("../utility/multer");

const router = express.Router();

router.post(
  "/new_property",
  body("name").isString(),
  body("property_type").isInt(),
  body("description").isString(),
  body("tenancy_status").isInt(),
  body("street").isString(),
  body("city").isString(),
  body("state").isString(),
  body("postal_code").isString(),
  body("country").isString(),
  body("latitude").isDecimal(),
  body("longitude").isDecimal(),
  body("area").isString(),
  body("funishing_status").isInt(),
  body("funishing_detail").isString(),
  body("share_property_url").isURL(),
  body("images.*.image").isInt(),
  propertyController.addProperty
);

router.post(
  "/update_property/:id",
  body("name").isString(),
  body("property_type").isInt(),
  body("description").isString(),
  body("tenancy_status").isInt(),
  body("street").isString(),
  body("city").isString(),
  body("state").isString(),
  body("postal_code").isString(),
  body("country").isString(),
  body("latitude").isDecimal(),
  body("longitude").isDecimal(),
  body("area").isString(),
  body("funishing_status").isInt(),
  body("funishing_detail").isString(),
  body("share_property_url").isURL(),
  body("images.*.image").isInt(),
  propertyController.updateProperty
);

router.post('/delete_property/:id',propertyController.deleteProperty);

router.post(
  "/image",
  upload.single("image"),
  body("caption").isString(),
  body("image")
    .custom((value, { req }) => {
      if (req.file.mimetype.startsWith('image/')) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Please only submit image."),
  propertyController.saveImage
);
module.exports = router;
