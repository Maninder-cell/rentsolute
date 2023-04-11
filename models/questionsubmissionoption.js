"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionSubmissionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionSubmissionOption.belongsTo(models.Option, {
        foreignKey: "option_id",
      });

      QuestionSubmissionOption.belongsTo(models.Question, {
        foreignKey: "question_id",
      });
    }
  }
  QuestionSubmissionOption.init(
    {
      question_id: DataTypes.INTEGER,
      option_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
      preferred: DataTypes.INTEGER,
      chosen: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "QuestionSubmissionOption",
    }
  );
  return QuestionSubmissionOption;
};
