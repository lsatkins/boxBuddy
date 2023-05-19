'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.exercises.hasMany(models.userPRs, {foreignKey: 'exerciseID'});
      models.exercises.hasMany(models.posts, {foreignKey: 'exerciseID'});
    }
  }
  exercises.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    muscle: DataTypes.STRING,
    equipment: DataTypes.STRING,
    instructions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exercises',
  });
  return exercises;
};