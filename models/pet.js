'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pet.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    breed: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pet',
  });
  return pet;
};