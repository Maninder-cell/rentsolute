const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const Question = db.Question;
const Option = db.Option;

exports.addQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const question = await Question.create({
    title: req.body.title,
    type: req.body.type,
    has_other: req.body.has_other,
    user_id: req.user.id,
  });

  const question_options = req.body.options.map((obj) => ({
    ...obj,
    question_id: question.id,
  }));

  const options = await Option.bulkCreate(question_options);

  const getQuestion = await Question.findOne({
    where: { id: question.id },
    include: [
      {
        model: Option,
        as: "Options",
      },
    ],
  });

  return res.json({
    statusCode: 200,
    message: "Question added successfully",
    data: getQuestion,
  });
};

exports.getQuestions = async (req, res, next) => {
  const questions = await Question.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: Option,
        as: "Options",
      },
    ],
  });

  return res.json({
    statusCode: 200,
    message: "Question list found successfully",
    suggested_list: questions,
  });
};
