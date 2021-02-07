'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user', foreignKey: 'userId'
      });
    }
  };
  Post.init({
    description: { type: DataTypes.STRING, allowNull: false },
    tag: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    image: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};