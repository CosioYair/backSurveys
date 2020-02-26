'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionGroup = sequelize.define('QuestionGroup', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantityMinimum: DataTypes.INTEGER,
    recomendation: DataTypes.STRING,
    surveyOid: {
      type: DataTypes.UUID,
    },
    parentOid: {
      type: DataTypes.UUID
    }
  }, {});
  QuestionGroup.associate = function (models) {
    QuestionGroup.belongsTo(models.SurveyQuest, { foreignKey: 'surveyOid', as: 'surveyQuest' });
    QuestionGroup.belongsTo(models.QuestionGroup, { foreignKey: 'parentOid', as: 'parentQuestionGroup' });
  };
  return QuestionGroup;
};