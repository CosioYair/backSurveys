'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContractType = sequelize.define('ContractType', {
    name: DataTypes.STRING
  }, {});
  ContractType.associate = function(models) {
    ContractType.hasMany(models.Employee, { foreignKey: 'contractTypeId', as: 'employees' });        
  };
  return ContractType;
};