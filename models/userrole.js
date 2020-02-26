'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  UserRole.associate = function (models) {
    // associations can be defined here
  };
  return UserRole;
};