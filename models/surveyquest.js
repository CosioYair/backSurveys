'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveyQuest = sequelize.define('SurveyQuest', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  SurveyQuest.associate = function (models) {
    SurveyQuest.hasMany(models.QuestionGroup, { foreignKey: 'surveyOid', as: 'questionGroup' });
  };
  return SurveyQuest;
};