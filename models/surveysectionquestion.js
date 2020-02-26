'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveySectionQuestion = sequelize.define('SurveySectionQuestion', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    surveySectionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    questionOid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    categoryOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    domainOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    dimensionOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    order: DataTypes.INTEGER
  }, {});
  SurveySectionQuestion.associate = function(models) {
    // associations can be defined here
  };
  return SurveySectionQuestion;
};