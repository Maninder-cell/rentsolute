"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyQuestion.belongsTo(models.Property, {
        foreignKey: "property_id",
      });

      PropertyQuestion.belongsTo(models.Question, {
        foreignKey: "question_id",
      });

      PropertyQuestion.hasMany(models.PropertyQuestionOption, {
        foreignKey: "property_question_id",
      });
    }
  }
  PropertyQuestion.init(
    {
      property_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      type: DataTypes.INTEGER,
      has_other: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertyQuestion",
    }
  );
  return PropertyQuestion;
};
