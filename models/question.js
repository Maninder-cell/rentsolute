'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User,{
        foreignKey: 'user_id'
      });
      Question.hasMany(models.Option,{
        foreignKey: 'question_id',
        as: 'Options',
      });
    }
  }
  Question.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.INTEGER,
    has_other: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};