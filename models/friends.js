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

      models.friends.belongsTo(models.users, {foreignKey: 'userID'});
      models.friends.belongsTo(models.users, {foreignKey: 'friendID'});
    }
  }
  friends.init({
    userID: DataTypes.INTEGER,
    friendID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};