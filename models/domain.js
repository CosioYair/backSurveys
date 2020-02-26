'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
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
  Domain.associate = function (models) {
    Domain.belongsToMany(models.EvaluationSurveySection, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'domainOid', as: 'evaluationSurveySections' });
    Domain.belongsToMany(models.Question, { through: models.SurveySectionQuestion, foreignKey: 'domainOid', as: 'questions' });
    Domain.belongsToMany(models.SurveySection, { through: models.SurveySectionQuestion, foreignKey: 'domainOid', as: 'surveySections' });
    Domain.belongsToMany(models.Dimension, { through: models.SurveySectionQuestion, foreignKey: 'domainOid', as: 'dimensions' });
    Domain.belongsToMany(models.Category, { through: models.SurveySectionQuestion, foreignKey: 'domainOid', as: 'categories' });
    Domain.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };
  return Domain;
};