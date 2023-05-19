'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPRs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.userPRs.belongsTo(models.users, {foreignKey: 'userID'});
      models.userPRs.belongsTo(models.exercises, {foreignKey: 'exerciseID'});
    }
  }
  userPRs.init({
    exerciseID: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    calories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userPRs',
  });
  return userPRs;
};