'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerEmployee = sequelize.define('AnswerEmployee', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    evaluationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionTypeId:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerValue: DataTypes.STRING
  }, {});
  AnswerEmployee.associate = function (models) {
    AnswerEmployee.belongsTo(models.EmployeeEvaluation, { foreignKey: 'evaluationId', as: 'evaluation' });
    AnswerEmployee.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    AnswerEmployee.belongsTo(models.QuestionType, { foreignKey: 'questionTypeId', as: 'questionType' });
  };
  return AnswerEmployee;
};