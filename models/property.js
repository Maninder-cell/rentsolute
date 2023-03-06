'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsToMany(models.Image,{
        through: models.PropertyImage,
        foreignKey: 'property_id',
        otherKey: 'image_id',
      });
      Property.belongsToMany(models.Amenity,{
        through: models.PropertyAmenity,
        foreignKey: 'property_id',
        otherKey: 'amenity_id',
      })
    }
  }
  Property.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    property_type: DataTypes.INTEGER,
    description: DataTypes.STRING,
    tenancy_status: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    area: DataTypes.STRING,
    funishing_status: DataTypes.INTEGER,
    funishing_detail: DataTypes.STRING,
    share_property_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};