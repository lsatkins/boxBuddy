'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.users.hasMany(models.posts, {foreignKey: 'userID'});
      models.users.hasMany(models.userPRs, {foreignKey: 'userID'});
      models.users.hasMany(models.friends, {foreignKey: 'userID'});
      models.users.hasMany(models.friends, {foreignKey: 'friendID'});
      models.users.hasMany(models.comments, {foreignKey: 'userID'});
      models.users.hasMany(models.likes, {foreignKey: 'userID'});
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};