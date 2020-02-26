'use strict';
module.exports = (sequelize, DataTypes) => {
  const EvaluationSurveySectionQuestion = sequelize.define('EvaluationSurveySectionQuestion', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    evaluationSurveySectionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    questionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    categoryOid: DataTypes.UUID,
    domainOid: DataTypes.UUID,
    dimensionOid: DataTypes.UUID,
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  EvaluationSurveySectionQuestion.associate = function (models) {
    EvaluationSurveySectionQuestion.belongsToMany(models.EmployeeEvaluation, { through: models.EmployeeEvaluationAnswer, foreignKey: 'evaluationSurveySectionQuestionOid', as: 'employeeEvaluations' });
  };
  return EvaluationSurveySectionQuestion;
};