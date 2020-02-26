'use strict';
module.exports = (sequelize, DataTypes) => {
  const PositionType = sequelize.define('PositionType', {
    name: DataTypes.STRING
  }, {});
  PositionType.associate = function (models) {
    PositionType.hasMany(models.Employee, { foreignKey: 'positionTypeId', as: 'employees' });
  };
  return PositionType;
};