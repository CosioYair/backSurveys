'use strict';
module.exports = (sequelize, DataTypes) => {
  const CivilStatus = sequelize.define('CivilStatus', {
    name: DataTypes.STRING
  }, {});
  CivilStatus.associate = function(models) {
    CivilStatus.hasMany(models.Employee, { foreignKey: 'civilStatusId', as: 'employees' });    
  };
  return CivilStatus;
};