'use strict';
module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    name: DataTypes.STRING
  }, {});
  Action.associate = function (models) {
    Action.belongsToMany(models.User, { through: models.UserAction, foreignKey: 'actionId', as: 'users' });
  };
  return Action;
};