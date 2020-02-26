'use strict';
module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define('Privilege', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  Privilege.associate = function(models) {
    Privilege.belongsToMany(models.Role, { through: models.RolePrivilege, foreignKey: 'privilegeId', as: 'roles' });
  };
  return Privilege;
};