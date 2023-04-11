"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsToMany(models.Property, {
        through: models.PropertyImage,
        foreignKey: "image_id",
        otherKey: "property_id",
      });
    }
  }
  Image.init(
    {
      caption: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
