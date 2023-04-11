"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionSubmission.belongsTo(models.PropertyApplicant, {
        foreignKey: "property_applicant_id",
      });

      QuestionSubmission.belongsTo(models.PropertyQuestion, {
        foreignKey: "property_question_id",
      });
    }
  }
  QuestionSubmission.init(
    {
      property_applicant_id: DataTypes.INTEGER,
      property_question_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      type: DataTypes.INTEGER,
      has_other: DataTypes.STRING,
      match: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "QuestionSubmission",
    }
  );
  return QuestionSubmission;
};
