'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveySection = sequelize.define('SurveySection', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {});
  SurveySection.associate = function (models) {
    SurveySection.belongsToMany(models.Question, { through: models.SurveySectionQuestion, foreignKey: 'surveySectionOid', as: 'questions' });
    SurveySection.belongsToMany(models.Category, { through: models.SurveySectionQuestion, foreignKey: 'surveySectionOid', as: 'categories' });
    SurveySection.belongsToMany(models.Domain, { through: models.SurveySectionQuestion, foreignKey: 'surveySectionOid', as: 'domains' });
    SurveySection.belongsToMany(models.Dimension, { through: models.SurveySectionQuestion, foreignKey: 'surveySectionOid', as: 'dimensions' });
    SurveySection.belongsToMany(models.SurveyCat, { through: models.SurveyCatSection, foreignKey: 'surveySectionOid', as: 'surveyCats' });
    SurveySection.belongsToMany(models.Evaluation, { through: models.EvaluationSurveySection, foreignKey: 'surveySectionOid', as: 'evaluations' });
    SurveySection.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };

  SurveySection.prototype.updateQuestions = async function (newQuestions) {
    const currentQuestions = await this.getQuestions();
    await sequelize.transaction(async transaction => {
      await Promise.all(
        newQuestions.map(async (newQuestion, index) => {
          const questionIndexToDelete = currentQuestions.findIndex(currentQuestion => currentQuestion.Oid == newQuestion.questionOid);
          if (questionIndexToDelete >= 0) {
            currentQuestions.splice(questionIndexToDelete, 1);
          }
          return this.addQuestion(newQuestion.questionOid, {
            transaction,
            through: {
              ...newQuestion,
              order: index + 1
            }
          });
        })
      )
      return await this.removeQuestion(currentQuestions);
    });
    return await this.getQuestions();
  };

  SurveySection.prototype.removeQuestions = async function (questions) {
    return await Promise.all(
      questions.map(question => {
        return this.removeQuestion(question.Oid);
      })
    );
  };

  return SurveySection;
};