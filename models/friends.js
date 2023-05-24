'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.friends.belongsTo(models.users, {foreignKey: 'userID', as: 'user'});
      models.friends.belongsTo(models.users, {foreignKey: 'friendID', as: 'fromUser'});
    }
  }
  friends.init({
    userID: DataTypes.INTEGER,
    friendID: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};