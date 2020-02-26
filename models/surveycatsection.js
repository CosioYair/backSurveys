'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveyCatSection = sequelize.define('SurveyCatSection', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    surveyCatOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    surveySectionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    surveyCatSectionParentOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    conditionalId: DataTypes.INTEGER,
    conditionalValue: DataTypes.INTEGER,
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  SurveyCatSection.associate = function(models) {
    SurveyCatSection.belongsTo(models.Conditional, { foreignKey: 'conditionalId', as: 'conditional' });    
    SurveyCatSection.belongsTo(models.SurveyCatSection, { foreignKey: 'surveyCatSectionParentOid', as: 'surveyCatSectionParent' });    
  };
  return SurveyCatSection;
};