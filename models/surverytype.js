'use strict';
module.exports = (sequelize, DataTypes) => {
  const SurveyType = sequelize.define('SurveyType', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  SurveyType.associate = function (models) {
  };
  return SurveyType;
};