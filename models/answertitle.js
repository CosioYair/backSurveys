'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerTitle = sequelize.define('AnswerTitle', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  AnswerTitle.associate = function(models) {
    AnswerTitle.belongsToMany(models.AnswerValue, { through: models.AnswerGroup, foreignKey: 'answerTitleId', as: 'values' });
    AnswerTitle.belongsToMany(models.AnswerType, { through: models.AnswerGroup, foreignKey: 'answerTitleId', as: 'types' });
  };
  return AnswerTitle;
};