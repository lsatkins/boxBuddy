'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.posts.hasMany(models.comments, {foreignKey: 'postID'});
      models.posts.hasMany(models.likes, {foreignKey: 'postID'});
      models.posts.belongsTo(models.users, {foreignKey: 'userID'});
      models.posts.belongsTo(models.exercises, {foreignKey: 'exerciseID'});
    }
  }
  posts.init({
    exerciseID: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    calories: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    measurement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};