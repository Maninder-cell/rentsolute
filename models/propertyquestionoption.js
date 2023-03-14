'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyQuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyQuestionOption.belongsTo(models.Property,{
        foreignKey: 'property_id'
      })
      PropertyQuestionOption.belongsTo(models.PropertyQuestion,{
        foreignKey: 'property_question_id'
      })
    }
  }
  PropertyQuestionOption.init({
    property_id: DataTypes.INTEGER,
    property_question_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    preferred: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PropertyQuestionOption',
  });
  return PropertyQuestionOption;
};