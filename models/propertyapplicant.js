'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyApplicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyApplicant.belongsTo(models.Property,{
        foreignKey: 'property_id'
      })

      PropertyApplicant.belongsTo(models.Image,{
        foreignKey: 'image_id'
      })
    }
  }
  PropertyApplicant.init({
    property_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    move_in_date: DataTypes.DATE,
    remarks: DataTypes.STRING,
    image_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    archive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PropertyApplicant',
  });
  return PropertyApplicant;
};