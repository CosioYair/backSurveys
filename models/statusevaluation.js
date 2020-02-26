'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusEvaluation = sequelize.define('StatusEvaluation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  StatusEvaluation.associate = function(models) {
    StatusEvaluation.hasMany(models.Evaluation, { foreignKey: 'statusEvaluationId', as: 'evaluations' });
    StatusEvaluation.hasMany(models.EmployeeEvaluation, { foreignKey: 'statusEvaluationId', as: 'employeeEvaluations' });
  };
  return StatusEvaluation;
};