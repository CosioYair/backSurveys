'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerValue = sequelize.define('AnswerValue', {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  AnswerValue.associate = function(models) {
    AnswerValue.belongsToMany(models.AnswerType, { through: models.AnswerGroup, foreignKey: 'answerValueId', as: 'types' });
    AnswerValue.belongsToMany(models.AnswerTitle, { through: models.AnswerGroup, foreignKey: 'answerValueId', as: 'titles' });
  };
  return AnswerValue;
};