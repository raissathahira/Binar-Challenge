'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game.hasOne(models.user_game_biodata,{
        foreignKey: 'id_user_game',
        as: 'user_biodata'
      }),
      user_game.hasMany(models.user_game_history,{
        foreignKey: 'id_user_game',
        as: 'user_history'
      })
    }
    checkPassword = password => bcrypt.compareSync(password, this.password)

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username }})
        if (!user) return Promise.reject("User not found!")
          const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Wrong password")
          return Promise.resolve(user)
       }
      catch(err) {
        return Promise.reject(err)
      }
    }
  };
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    generate_random: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};