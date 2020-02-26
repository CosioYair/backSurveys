'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAction = sequelize.define('UserAction', {
    Oid: DataTypes.UUID,
    userOid: DataTypes.UUID,
    actionId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    expDate: DataTypes.DATE
  }, {});
  UserAction.associate = function(models) {
    // associations can be defined here
  };
  return UserAction;
};