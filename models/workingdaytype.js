'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkingDayType = sequelize.define('WorkingDayType', {
    name: DataTypes.STRING
  }, {});
  WorkingDayType.associate = function(models) {
    WorkingDayType.hasMany(models.Employee, { foreignKey: 'workingDayTypeId', as: 'employees' });            
  };
  return WorkingDayType;
};