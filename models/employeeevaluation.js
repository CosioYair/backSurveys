'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeEvaluation = sequelize.define('EmployeeEvaluation', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    companyOid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeOid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluationOid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    statusEvaluationId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    completed: DataTypes.BOOLEAN,
    questionsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  EmployeeEvaluation.associate = function (models) {
    EmployeeEvaluation.belongsToMany(models.EvaluationSurveySectionQuestion, { through: models.EmployeeEvaluationAnswer, foreignKey: 'employeeEvaluationOid', as: 'evaluationSurveySectionQuestions' });
    EmployeeEvaluation.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
    EmployeeEvaluation.belongsTo(models.StatusEvaluation, { foreignKey: 'statusEvaluationId', as: 'status' });
  };
  EmployeeEvaluation.prototype.getPercentageFinished = async function () {
    const evaluationSurveySectionQuestions = await this.getEvaluationSurveySectionQuestions();
    const total = this.questionsNumber;
    let finished = evaluationSurveySectionQuestions.length;
    return (finished / total) * 100;
  };
  return EmployeeEvaluation;
};