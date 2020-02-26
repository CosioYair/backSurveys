'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeEvaluationAnswer = sequelize.define('EmployeeEvaluationAnswer', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    employeeEvaluationOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    evaluationSurveySectionQuestionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    value: DataTypes.INTEGER,
    openQuestion: DataTypes.BOOLEAN,
    openValue: DataTypes.STRING,
    notApplicable: DataTypes.BOOLEAN
  }, {});
  EmployeeEvaluationAnswer.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeEvaluationAnswer;
};