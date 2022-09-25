'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.request.hasMany(models.pet);
      models.request.belongsTo(models.user);
      // define association here
    }
  }
  request.init({
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};