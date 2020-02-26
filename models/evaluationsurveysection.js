'use strict';
module.exports = (sequelize, DataTypes) => {
  const EvaluationSurveySection = sequelize.define('EvaluationSurveySection', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    evaluationOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    surveySectionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    evaluationSurveySectionParentOid: DataTypes.UUID,
    conditionalId: DataTypes.INTEGER,
    conditionalValue: DataTypes.INTEGER,
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      afterBulkCreate: async function (evaluationSurveySection) {
        const SurveySection = require('../models').SurveySection;
        evaluationSurveySection = evaluationSurveySection[0];
        const surveySection = await SurveySection.findOne({ where: { Oid: evaluationSurveySection.surveySectionOid } });
        const questions = await surveySection.getQuestions();
        await Promise.all(questions.map(async question => {
          const surveySectionQuestion = question.SurveySectionQuestion;
          const surveySectionQuestionValues = { ...surveySectionQuestion.dataValues };
          delete surveySectionQuestionValues.Oid;
          await evaluationSurveySection.addQuestion(question.Oid, {
            through: {
              ...surveySectionQuestionValues
            }
          });
          return question;
        }));
      }
    }
  });
  EvaluationSurveySection.associate = function (models) {
    EvaluationSurveySection.belongsTo(models.Conditional, { foreignKey: 'conditionalId', as: 'conditional' });
    EvaluationSurveySection.belongsTo(models.EvaluationSurveySection, { foreignKey: 'evaluationSurveySectionParentOid', as: 'evaluationSurveySectionParent' });
    EvaluationSurveySection.belongsToMany(models.Question, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'evaluationSurveySectionOid', as: 'questions' });
    EvaluationSurveySection.belongsToMany(models.Category, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'evaluationSurveySectionOid', as: 'categories' });
    EvaluationSurveySection.belongsToMany(models.Domain, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'evaluationSurveySectionOid', as: 'domains' });
    EvaluationSurveySection.belongsToMany(models.Dimension, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'evaluationSurveySectionOid', as: 'dimensions' });
  };
  EvaluationSurveySection.prototype.getFormatedQuestions = async function () {
    const questions = await this.getQuestions();
    const formatedQuestions = {};
    const answerGroups = {};
    await Promise.all(questions.map(async question => {
      if(!answerGroups[question.answerTypeId]) {
        const answerType = await question.getAnswerType();
        const formatedAnswerGroup = await answerType.getFormatedAnswerGroup();
        answerGroups[question.answerTypeId] = formatedAnswerGroup;
      }
      formatedQuestions[question.answerTypeId] = !formatedQuestions[question.answerTypeId] ? [...[], question] : [...formatedQuestions[question.answerTypeId], question];
      return question;
    }));
    formatedQuestions.answerGroups = answerGroups;
    return formatedQuestions;
  };
  return EvaluationSurveySection;
};