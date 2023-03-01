const express = require('express')
const propertyController = require('../controllers/property');
const { body } = require('express-validator');

const router = express.Router();

router.post('/new_property',
    body('name').isString(),
    body('property_type').isInt(),
    body('description').isString(),
    body('tenancy_status').isString(),
    body('street').isString(),
    body('city').isString(),
    body('state').isString(),
    body('postal_code').isString(),
    body('country').isString(),
    body('latitude').isDecimal(),
    body('longitude').isDecimal(),
    body('area').isDecimal(),
    body('funishing_status').isInt(),
    body('funishing_detail').isString(),
    body('share_property_url').isURL(),
    propertyController.addProperty,
);

module.exports = router;