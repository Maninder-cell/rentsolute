const express = require("express");
const adminController = require("../controllers/admin");
const { body } = require("express-validator");

const router = express.Router();

router.get("/users",adminController.userList);
router.post(
    "/block",
    body("user").isInt(),
    body("status").isInt({min: 0,max: 1}),
    adminController.blockUser
);

module.exports = router;