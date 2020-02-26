'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conditional = sequelize.define('Conditional', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Conditional.associate = function (models) {
    Conditional.hasMany(models.SurveyCatSection, { foreignKey: 'conditionalId', as: 'surveyCatSections' });
    Conditional.hasMany(models.EvaluationSurveySection, { foreignKey: 'conditionalId', as: 'evaluationSurveySections' });
  };
  return Conditional;
};