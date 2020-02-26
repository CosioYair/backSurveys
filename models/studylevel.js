'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudyLevel = sequelize.define('StudyLevel', {
    name: DataTypes.STRING
  }, {});
  StudyLevel.associate = function(models) {
    StudyLevel.hasMany(models.Employee, { foreignKey: 'studyLevelId', as: 'employees' });        
  };
  return StudyLevel;
};