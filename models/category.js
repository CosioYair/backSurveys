'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
  Category.associate = function (models) {
    Category.belongsToMany(models.EvaluationSurveySection, { through: models.EvaluationSurveySectionQuestion, foreignKey: 'categoryOid', as: 'evaluationSurveySections' });
    Category.belongsToMany(models.Question, { through: models.SurveySectionQuestion, foreignKey: 'categoryOid', as: 'questions' });
    Category.belongsToMany(models.SurveySection, { through: models.SurveySectionQuestion, foreignKey: 'categoryOid', as: 'surveySections' });
    Category.belongsToMany(models.Domain, { through: models.SurveySectionQuestion, foreignKey: 'categoryOid', as: 'domains' });
    Category.belongsToMany(models.Dimension, { through: models.SurveySectionQuestion, foreignKey: 'categoryOid', as: 'dimensions' });
    Category.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
  };
  return Category;
};