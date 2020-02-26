'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dimension = sequelize.define('Dimension', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {});
  Dimension.associate = function (models) {
    Dimension.belongsToMany(models.EvaluationSurveySection, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'dimensionOid', as: 'evaluationSurveySections' });
    Dimension.belongsToMany(models.Question, { through: models.SurveySectionQuestion, foreignKey: 'dimensionOid', as: 'questions' });
    Dimension.belongsToMany(models.SurveySection, { through: models.SurveySectionQuestion, foreignKey: 'dimensionOid', as: 'surveySections' });
    Dimension.belongsToMany(models.Domain, { through: models.SurveySectionQuestion, foreignKey: 'dimensionOid', as: 'domains' });
    Dimension.belongsToMany(models.Category, { through: models.SurveySectionQuestion, foreignKey: 'dimensionOid', as: 'categories' });
    Dimension.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };
  return Dimension;
};