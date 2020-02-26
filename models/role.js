'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.Privilege, { through: models.RolePrivilege, foreignKey: 'roleId', as: 'privileges' });
    Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'roleId', as: 'users' });
  };
  return Role;
};