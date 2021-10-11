'use strict';
const {
  Model
} = require('sequelize');
const user_game = require('./user_game');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     user_game_history.belongsTo(models.user_game, {
       foreignKey:"id_user_game",
       as: "user_history"

     })
    }
  };
  user_game_history.init({
    poin: DataTypes.INTEGER,
    total_play: DataTypes.INTEGER,
    id_user_game: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_history',
  });
  return user_game_history;
};