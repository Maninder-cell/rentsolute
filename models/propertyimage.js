"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyImage.belongsTo(models.Property, {
        foreignKey: "property_id",
      });

      PropertyImage.belongsTo(models.Image, {
        foreignKey: "image_id",
      });
    }
  }
  PropertyImage.init(
    {
      property_id: DataTypes.INTEGER,
      image_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PropertyImage",
    }
  );
  return PropertyImage;
};
