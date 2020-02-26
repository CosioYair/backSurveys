'use strict';
module.exports = (sequelize, DataTypes) => {
  const StaffType = sequelize.define('StaffType', {
    name: DataTypes.STRING
  }, {});
  StaffType.associate = function(models) {
    StaffType.hasMany(models.Employee, { foreignKey: 'staffTypeId', as: 'employees' });    
  };
  return StaffType;
};