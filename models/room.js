"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Image, {
        foreignKey: "image_id",
      });

      Room.belongsTo(models.Property, {
        foreignKey: "property_id",
      });
    }
  }
  Room.init(
    {
      property_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image_id: DataTypes.INTEGER,
      url: DataTypes.STRING,
      caption: DataTypes.STRING,
      room_type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
