'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {});
  Question.associate = function (models) {
    Question.belongsToMany(models.EvaluationSurveySection, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'questionOid', as: 'evaluationSurveySections' });
    Question.belongsToMany(models.SurveySection, { through: models.SurveySectionQuestion, foreignKey: 'questionOid', as: 'surveySections' });
    Question.belongsToMany(models.Category, { through: models.SurveySectionQuestion, foreignKey: 'questionOid', as: 'categories' });
    Question.belongsToMany(models.Domain, { through: models.SurveySectionQuestion, foreignKey: 'questionOid', as: 'domains' });
    Question.belongsToMany(models.Dimension, { through: models.SurveySectionQuestion, foreignKey: 'questionOid', as: 'dimensions' });
    Question.belongsTo(models.AnswerType, { foreignKey: 'answerTypeId', as: 'answerType' });
    Question.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };
  return Question;
};