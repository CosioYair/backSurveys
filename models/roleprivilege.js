'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePrivilege = sequelize.define('RolePrivilege', {
    roleId: DataTypes.INTEGER,
    privilegeId: DataTypes.INTEGER
  }, {});
  RolePrivilege.associate = function(models) {
    // associations can be defined here
  };
  return RolePrivilege;
};