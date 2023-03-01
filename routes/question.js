const express = require("express");
const questionController = require("../controllers/question");
const { body } = require("express-validator");

const router = express.Router();

router.post(
    "/new_question",
    body('title').isString(),
    body('type').isInt(),
    body('options.*.text').isString(),
    body('options.*.preferred').isInt({min:0, max:1}),
    questionController.addQuestion
);

router.get("/get_questions",questionController.getQuestions);

module.exports = router;
